import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserPicks, submitUserPicks } from 'api/userPickApi';

// 관심사 목록 가져오기
export const useUserPickQuery = () => {
  return useQuery({
    queryKey: ['userPicks'],
    queryFn: getUserPicks,
  });
};

// 유저 선택 결과
export const useUserPickMutation = () => {
  return useMutation({
    mutationFn: submitUserPicks,
  });
};
