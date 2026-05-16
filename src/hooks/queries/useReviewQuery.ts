import { useQuery } from "@tanstack/react-query";
import { getUserReviews } from "../../api/reviewApi";

export const useReviewQuery = () => {
  return useQuery({
    queryKey: ["myReviews"],
    queryFn: getUserReviews,
  });
};
