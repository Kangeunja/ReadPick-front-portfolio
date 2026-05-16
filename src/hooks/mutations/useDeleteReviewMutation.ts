import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../../api/reviewApi";

export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myReviews"],
      });
    },
  });
};
