import { useQuery } from '@tanstack/react-query';
import { getUserPicks } from '../../../api/userPickApi';

export const useUserPickQuery = () => {
  return useQuery({
    queryKey: ['userPicks'],
    queryFn: getUserPicks,
  });
};
