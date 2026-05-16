import api from "./axiosInstance";

import { BsItem } from "../types/userPick";

export const getUserPicks = async (): Promise<BsItem[]> => {
  const res = await api.get("/userPick");
  return res.data;
};

export const submitUserPicks = async (data: string[][]) => {
  const res = await api.post("/userPickResult", data);
  return res.data;
};
