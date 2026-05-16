const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();

// CORS 설정
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// 신호 감지 로그 (항상 프록시보다 위에 있어야 함)
app.use((req, res, next) => {
  console.log(`[BFF 신호 감지] 브라우저 요청: ${req.url}`);
  next();
});

// 자바 서버로 프록시 전달
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:8080/api",
    changeOrigin: true,

    // /api를 유지하면서 자바에게 그대로 전달
    pathRewrite: {
      "^/api": "/api",
    },

    on: {
      proxyReq: (proxyReq, req, res) => {
        console.log(
          `[BFF 배달] 자바로 쏘는 최종 주소: http://localhost:8080${req.url}`,
        );
      },
      error: (err, req, res) => {
        console.error("[BFF 에러] 자바 서버 연결 실패!", err);
      },
    },

    onProxyReq: (proxyReq, req) => {
      console.log(
        `[BFF 배달] 자바로 쏘는 주소: http://localhost:8080${req.url}`,
      );
    },
    onError: (err, req, res) => {
      console.error("[BFF 에러] 자바 서버에 연결할 수 없습니다:", err.message);
    },
  }),
);

app.listen(4000, () => {
  console.log("🚀 노드 서버(BFF)가 4000번 포트에서 실행 중입니다!");
});
