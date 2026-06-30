import api from './axiosInstance';
import { LoginRequest, SignupFormData } from 'types/auth';

// 회원가입
export const signup = async (data: SignupFormData) => {
  const res = await api.post('/userInsert', data);
  return res.data;
};

// 아이디 중복확인
export const checkIdApi = async (id: string) => {
  const res = await api.post('/checkId', null, {
    params: { id },
  });
  return res.data;
};

// 로그인
export const login = async (data: LoginRequest) => {
  const res = await api.post('/login', data);
  return res.data;
};

// 로그아웃
export const logout = async () => {
  const res = await api.post('/logout');
  return res.data;
};

// 첫방문
export const checkFirstVisit = async () => {
  const res = await api.get('/firstAt');
  return res.data;
};

// 로그인 여부(임시)
export const getAuthUser = async () => {
  const res = await api.post('/myPage/userInfo');
  return res.data;
};
