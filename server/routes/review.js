const express = require('express');
const Groq = require('groq-sdk');
const router = express.Router();

// 환경변수 api 키 확인 변수
const ensureGroqKey = () => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY가 설정되지 않았습니다. .env 파일을 확인하세요.');
  }
};

// 순수 json문자열만 추출하는 함수(1차 청소)
const normalizeGroqResponse = (responseText) => {
  if (!responseText) {
    throw new Error('Groq 응답이 비어 있습니다.');
  }

  return responseText
    .replace(/```json\s*/gi, '')
    .replace(/```/g, '')
    .trim();
};

// 텍스트 형태의 API 응답을 JSON으로 변환하는 함수(2차 변환)
const parseJsonFromGroq = (responseText) => {
  try {
    return JSON.parse(responseText);
  } catch (error) {
    const match = responseText.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error('Groq JSON 응답을 파싱할 수 없습니다.');
    }

    return JSON.parse(match[0]);
  }
};

// Groq 인스턴스 생성 함수
const createGroqClient = () => {
  ensureGroqKey();
  return new Groq({ apiKey: process.env.GROQ_API_KEY });
};

// 여러 리뷰(배열)로부터 종합 요약과 태그를 생성하는 함수
const generateReviewAnalysisFromArray = async ({ reviews, title, author, genre }) => {
  const groq = createGroqClient();

  const reviewsText = Array.isArray(reviews) ? reviews.map((r, i) => `리뷰 ${i + 1}: ${r}`).join('\n\n') : String(reviews || '');

  const prompt = `
  다음은 여러 사용자의 리뷰 모음입니다.
  - 제목: ${title || '제목 없음'}
  - 저자: ${author || '알 수 없음'}
  - 장르: ${genre || '기타'}
  - 리뷰들:
  ${reviewsText}

  요청사항:
  1. 전체 리뷰들을 종합하여 핵심을 3~4문장으로 요약해 주세요.
  2. 리뷰들의 분위기와 반복되는 키워드를 바탕으로 태그 5개를 추천해 주세요.
  3. 반드시 JSON 형식으로만 응답해 주세요.
  4. JSON 구조는 다음과 같아야 합니다:
  {
    "summary": "요약 내용",
    "tags": ["태그1", "태그2", "태그3", "태그4", "태그5"]
  }
  5. 태그는 한국어로 작성하고, 중복은 피하세요.
`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    response_format: { type: 'json_object' },
  });

  const responseText = completion.choices[0]?.message?.content;

  const normalizedText = normalizeGroqResponse(responseText);
  return parseJsonFromGroq(normalizedText);
};

// 종합 리뷰 요약 엔드포인트 (배열 입력)
router.post('/review/summary-all', async (req, res) => {
  try {
    const { reviews, title, author, genre } = req.body || {};

    if (!Array.isArray(reviews) || reviews.length === 0) {
      return res.status(400).json({
        success: false,
        message: '요약할 리뷰 데이터가 없습니다.',
      });
    }

    const result = await generateReviewAnalysisFromArray({ reviews, title, author, genre });
    console.log('result::::', result);

    return res.status(200).json({
      success: true,
      data: {
        summary: result.summary || '',
        tags: Array.isArray(result.tags) ? result.tags : [],
      },
    });
  } catch (error) {
    console.error('[review summary-all error]', error.message);
    return res.status(500).json({
      success: false,
      message: '리뷰 요약 생성 중 오류가 발생했습니다.',
      error: error.message,
    });
  }
});

const buildBookBuddyPrompt = ({ title, author, category, history = [], message }) => {
  const historyText =
    Array.isArray(history) && history.length > 0
      ? history.map((item) => `사용자: ${item.user || ''}\nAI: ${item.ai || ''}`).join('\n\n')
      : '이전 대화 내용 없음';

  return `
  당신은 책 전문 AI 북버디입니다.
  - 책 제목: ${title || '제목 없음'}
  - 저자: ${author || '알 수 없음'}
  - 카테고리: ${category || '기타'}
  - 역할: 해당 책에 대해 친근하고 도움이 되는 방식으로 질문에 답하세요.
  - 규칙: 답변은 짧고 자연스럽게, 한국어로, 독자가 책을 더 이해하도록 도와주세요.
  - 이전 대화:
  ${historyText}

  현재 사용자 질문:
  ${message || ''}

  답변은 반드시 한국어로, 2~4문장 정도로 작성해 주세요.
  모든 답변은 반드시 자연스럽고 완벽한 한국어로만 작성하세요. 외래어, 다국어 단어(영어, 베트남어 등)나 어색한 translation 말투를 절대로 섞지 마세요.
  반드시 {"reply": "답변 내용"} 형태의 JSON으로만 응답해 주세요.
`;
};

const generateBookBuddyReply = async ({ title, author, category, history, message }) => {
  const groq = createGroqClient();

  const prompt = buildBookBuddyPrompt({ title, author, category, history, message });
  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    response_format: { type: 'json_object' },
  });

  // ```json등을 제거해 파싱하기 편하게 정리
  const responseText = completion.choices[0]?.message?.content;
  const normalizedText = normalizeGroqResponse(responseText);

  try {
    // json 형태로 파싱 후 reply 키를 추출한다.
    const parsed = parseJsonFromGroq(normalizedText);
    return parsed.reply || parsed.replay || '';
  } catch (error) {
    return normalizedText;
  }
};

router.post('/review/book-buddy', async (req, res) => {
  try {
    const { title, author, category, history, message } = req.body || {};

    if (!message || String(message).trim().length < 1) {
      return res.status(400).json({
        success: false,
        message: '질문 내용을 입력해 주세요.',
      });
    }

    const reply = await generateBookBuddyReply({ title, author, category, history, message });

    return res.status(200).json({
      success: true,
      data: {
        reply: reply || '답변을 생성하지 못했습니다.',
      },
    });
  } catch (error) {
    console.error('[book buddy error]', error.message);
    return res.status(500).json({
      success: false,
      message: 'AI 북버디 응답 생성 중 오류가 발생했습니다.',
      error: error.message,
    });
  }
});

module.exports = router;
