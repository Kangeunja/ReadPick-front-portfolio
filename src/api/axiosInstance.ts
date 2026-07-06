import axios from 'axios';
import { useAuthStore } from 'store/authStore';

// console.log("현재 NODE_ENV:", process.env.NODE_ENV);
console.log('읽어온 API 주소:', process.env.REACT_APP_API_URL);

// 기본 api url 설정
const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api`;
// process.env.REACT_APP_API_URL
//   ? `${process.env.REACT_APP_API_URL}/api`
//   : "http://localhost:4000/api"; // 노드 서버 포트
// : "http://localhost:8080/api"; // 자바 서버 포트

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
  withCredentials: true, // Refresh Token을 httpOnly 쿠키로 저장할 경우
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
