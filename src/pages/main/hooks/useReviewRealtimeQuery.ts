import { useQuery } from '@tanstack/react-query';
import { getRealtimeReviews } from 'api/reviewApi';

export const useReviewRealtimeQuery = () => {
  return useQuery({
    queryKey: ['reviewRealtime'],
    queryFn: getRealtimeReviews,
  });
};
