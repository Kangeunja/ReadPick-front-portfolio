const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// CORS 설정
const ALLOWED_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? 'https://readpick-front-portfolio.netlify.app' // 내 실제 넷리파이 주소
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

app.use(
  '/api',
  createProxyMiddleware({
    // target: "http://localhost:8080/api",
    target: JAVA_SERVER_URL,
    changeOrigin: true,

    // /api를 유지하면서 자바에게 그대로 전달
    pathRewrite: {
      '^/api': '/api',
    },

    on: {
      proxyReq: (proxyReq, req, res) => {
        console.log(`[BFF 배달] 자바로 쏘는 최종 주소:${JAVA_SERVER_URL}`);
      },
      error: (err, req, res) => {
        console.error('[BFF 에러] 자바 서버 연결 실패!', err);
      },
    },
  }),
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 노드 서버(BFF)가 ${PORT}번 포트에서 실행 중입니다!`);
});
