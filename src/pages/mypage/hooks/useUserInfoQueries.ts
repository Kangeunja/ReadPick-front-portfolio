import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { UserProfile } from 'types/user';

import {
  deleteProfileImage,
  getFavoriteBooks,
  getFavoriteBooksImages,
  getUserInfo,
  updateProfileImage,
  updateUserInfo,
} from 'api/mypageApi';

// 사용자 정보 조회
export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });
};

// 찜 목록 조회
export const useFavoritQuery = () => {
  return useQuery({
    queryKey: ['favorit'],
    queryFn: getFavoriteBooks,
  });
};

// 찜 목록 이미지 조회
export const useFavoritImgQuery = () => {
  return useQuery({
    queryKey: ['favoritImg'],
    queryFn: getFavoriteBooksImages,
  });
};

// 프로필 이미지 삭제
export const useDeleteProfileImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};

// 프로필 이미지 등록/수정
export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, isDefaultImage }: { file: File; isDefaultImage: boolean }) => updateProfileImage(file, isDefaultImage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};

// 회원정보 수정
export const useUpdateUserInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userInfo: UserProfile) => {
      const res = await updateUserInfo(userInfo);
      const result = res.data || res;

      if (result !== 'success') {
        throw new Error(result);
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};
