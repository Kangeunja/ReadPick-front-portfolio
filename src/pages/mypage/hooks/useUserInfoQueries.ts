import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteProfileImage, getUserInfo, updateProfileImage, updateUserInfo } from '../../../api/mypageApi';
import { UserProfile } from '../../../types/user';

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, isDefaultImage }: { file: File; isDefaultImage: boolean }) => updateProfileImage(file, isDefaultImage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};

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
    // mutationFn: (userInfo: UserProfile) => updateUserInfo(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};

export const useDeleteProfileImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};
