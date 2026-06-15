import api from "./axiosInstance";
import { BookItem } from "../types/main";

export const getTodayBook = async (): Promise<BookItem> => {
  const res = await api.get("/todayBook");
  return res.data;
}

export const getUserGenreBooks = async (): Promise<BookItem[]> => {          
    const res = await api.get("/userGenreBook");    
    return res.data;
}