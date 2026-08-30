import { useQuery } from '@tanstack/react-query';
import { getRealtimeReviews } from 'api/reviewApi';

export const useReviewRealtimeQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['reviewRealtime'],
    queryFn: getRealtimeReviews,
    ...options,
  });
};
