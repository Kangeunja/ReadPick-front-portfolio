import { useQuery } from "@tanstack/react-query";
import { getFavoriteBooks } from "../../api/mypageApi";

export const useFavoritQuery = () => {
  return useQuery({
    queryKey: ["favorit"],
    queryFn: getFavoriteBooks,
  });
};
