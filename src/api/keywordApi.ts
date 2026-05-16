import api from "./axiosInstance";

export const getKeywordList = async () => {
  const res = await api.get("/bssListByBsIdx");
  return res.data;
};
