import api from "./axiosInstance";
import { Book, BookImg } from "../types/book";

export const getUserInfo = async () => {
  const res = await api.post("/myPage/userInfo");
  return res.data;
};

export const getFavoriteBooks = async (): Promise<Book[]> => {
  const res = await api.post("/myPage/userPickBookList");
  return res.data;
};

export const getFavoriteBooksImages = async (): Promise<BookImg[]> => {
  const res = await api.post("/myPage/bookmarkImageList");
  return res.data;
};
