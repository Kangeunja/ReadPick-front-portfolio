import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../../api/mypageApi';
import { getUserPicks } from '../../../api/userPickApi';

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });
};

export const useUserPickQuery = () => {
  return useQuery({
    queryKey: ['userPicks'],
    queryFn: getUserPicks,
  });
};
