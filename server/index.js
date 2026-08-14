// 서버 설정 및 환경변수
const path = require('path');
console.log(path);
require('dotenv').config({ path: path.join(__dirname, '.env') });

// API 키 로드 테스트 로그
console.log('GROQ_API_KEY 로드 상태:', process.env.GROQ_API_KEY ? '성공' : '실패 (undefined)');

const express = require('express');
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');
const cors = require('cors');
const reviewRouter = require('./routes/review');
const fetchWithRetry = require('./utils/fetchWithRetry');

const app = express();

const ALLOWED_ORIGIN = process.env.NODE_ENV === 'production' ? 'https://readpick-front-portfolio-v1.netlify.app' : 'http://localhost:3000';

const JAVA_SERVER_URL =
  process.env.NODE_ENV === 'production' ? 'https://readpick-backend-portfolio-c7rj.onrender.com/api' : 'http://localhost:8080/api';

app.set('JAVA_SERVER_URL', JAVA_SERVER_URL);

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    credentials: true,
  }),
);

// app.use(express.json());

app.use((req, res, next) => {
  console.log(`[BFF 신호 감지] 브라우저 요청: ${req.url}`);
  next();
});

app.get('/api/main', async (req, res) => {
  console.log('[BFF 통합 요청] 메인 화면 데이터 조합 시작...');

  try {
    const [todayBookRes, bsListRes] = await Promise.all([
      fetchWithRetry(`${JAVA_SERVER_URL}/todayBook`)
        .then(async (r) => {
          if (!r.ok) return null;
          return r.json();
        })
        .catch(() => null),

      fetchWithRetry(`${JAVA_SERVER_URL}/bsList`)
        .then(async (r) => (r && r.ok ? r.json() : []))
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
    return res.status(500).json({
      success: false,
      message: '메인 데이터 조회 중 오류가 발생했습니다.',
    });
  }
});

app.use('/api/review', express.json(), reviewRouter);

app.use(
  '/api',
  createProxyMiddleware({
    target: JAVA_SERVER_URL,
    changeOrigin: true,
    proxyTimeout: 60000,
    timeout: 60000,
    // filter: (pathname) => !pathname.startsWith('/api/review') && pathname !== '/api/main',
    // pathRewrite: {
    //   '^/api': '/api',
    // },
    on: {
      proxyReq: (proxyReq, req) => {
        console.log(`[BFF 배달] 자바로 쏘는 최종 주소:${JAVA_SERVER_URL}`);
        fixRequestBody(proxyReq, req);
      },
      error: (err) => {
        console.error('[BFF 경고] 자바 서버가 아직 잠들어 있거나 응답이 지연됩니다. (콜드 스타트 중)', err.message);
      },
    },
  }),
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 노드 서버(BFF)가 ${PORT}번 포트에서 실행 중입니다!`);
});
