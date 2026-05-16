import { useQuery } from "@tanstack/react-query";
import { getFavoriteBooksImages } from "../../api/mypageApi";

export const useFavoritImgQuery = () => {
  return useQuery({
    queryKey: ["favoritImg"],
    queryFn: getFavoriteBooksImages,
  });
};
