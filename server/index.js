const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// CORS 설정
const ALLOWED_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? 'https://readpick-front-portfolio-v1.netlify.app' // 내 실제 넷리파이 주소
    : 'http://localhost:3000';

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    credentials: true,
  }),
);

// 신호 감지 로그 (항상 프록시보다 위에 있어야 함)
app.use((req, res, next) => {
  console.log(`[BFF 신호 감지] 브라우저 요청: ${req.url}`);
  next();
});

// 자바 서버로 프록시 전달
const JAVA_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://readpick-backend-portfolio-c7rj.onrender.com/api' // 실제 자바 서버
    : 'http://localhost:8080/api';

// 자바 서버가 잠들어 있을 때 재시도 함수
async function fetchWithRetry(url, options = {}, retries = 5, delay = 10000) {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      // 각 시도당 60초 대기
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.log(`[BFF] 자바 백엔드 콜드 스타트 대기 중... (${i + 1}/${retries}번째 시도 실패): ${err.message}`);

      // 마지막 시도까지 실패하면 에러 던지기
      if (i === retries - 1) throw err;

      // 다음 시도 전 10초 대기
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  return null;
}

app.get('/api/main', async (req, res) => {
  console.log('[BFF 통합 요청] 메인 화면 데이터 조합 시작...');

  try {
    const [todayBookRes, bsListRes] = await Promise.all([
      fetch(`${JAVA_SERVER_URL}/todayBook`)
        .then(async (r) => {
          // 자바 서버가 200이 아니거나 데이터가 없을 때의 예외 처리
          if (!r.ok) return null;
          return r.json();
        })
        .catch(() => null),

      fetch(`${JAVA_SERVER_URL}/bsList`)
        .then(async (r) => {
          if (!r.ok) return [];
          return r.json();
        })
        .catch(() => []),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        todayBook: todayBookRes?.data || todayBookRes || null,
        bsList: bsListRes?.data || bsListRes || [],
      },
    });
  } catch (error) {
    console.error('[BFF 에러] 메인 데이터 통합 조회 중 문제 발생:', error.message);
  }
});

app.use(
  '/api',
  createProxyMiddleware({
    // target: "http://localhost:8080/api",
    target: JAVA_SERVER_URL,
    changeOrigin: true,
    proxyTimeout: 60000,
    timeout: 60000,

    // /api를 유지하면서 자바에게 그대로 전달
    pathRewrite: {
      '^/api': '/api',
    },

    on: {
      proxyReq: (proxyReq, req, res) => {
        console.log(`[BFF 배달] 자바로 쏘는 최종 주소:${JAVA_SERVER_URL}`);
      },
      error: (err, req, res) => {
        console.error('[BFF 경고] 자바 서버가 아직 잠들어 있거나 응답이 지연됩니다. (콜드 스타트 중)', err.message);
      },
    },
  }),
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 노드 서버(BFF)가 ${PORT}번 포트에서 실행 중입니다!`);
});
