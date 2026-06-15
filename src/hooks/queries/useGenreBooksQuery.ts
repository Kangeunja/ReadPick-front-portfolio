import { useQuery } from "@tanstack/react-query";
import { getUserGenreBooks } from "../../api/bookApi";

export const useGenreBooksQuery = (isLogin: boolean) => {
  return useQuery({
    queryKey: ["userGenreBook"],
    queryFn: getUserGenreBooks,
    enabled: isLogin, // 로그인한 사용자에 대해서만 쿼리 실행
  });
};
