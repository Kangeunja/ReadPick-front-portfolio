import api from "./axiosInstance";

// 로그인
export const login = async (data: { id: string; pw: string }) => {
  const res = await api.post("/login", data);
  return res.data;
};

// 로그아웃
export const logout = async () => {
  const res = await api.post("/logout");
  return res.data;
};

// 첫방문
export const checkFirstVisit = async () => {
  const res = await api.get("/firstAt");
  return res.data;
};

// 로그인 여부(임시)
export const getAuthUser = async () => {
  const res = await api.post("/myPage/userInfo");
  return res.data;
};
