import { useQuery } from '@tanstack/react-query';
import { getReviewSummary } from 'api/reviewApi';
import { ReviewArrayRequest } from 'types/review';

export const useReviewSummaryQuery = (requestData: ReviewArrayRequest) => {
  const hasReviews = Array.isArray(requestData?.reviews) && requestData.reviews.length > 0;
  const hasTitle = Boolean(requestData?.title && requestData.title.trim() !== '');

  return useQuery({
    queryKey: ['reviewSummary', requestData.title, requestData.reviews.length],
    queryFn: () => getReviewSummary(requestData),
    enabled: hasReviews && hasTitle,
    retry: false,
    refetchOnWindowFocus: false, // 브라우저 탭 전환시 재요청 안함
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
