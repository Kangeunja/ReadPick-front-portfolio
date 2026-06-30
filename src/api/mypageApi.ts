import api from './axiosInstance';
import { Book, BookImg } from '../types/book';
import { UserProfile } from '../types/user';

export const getUserInfo = async () => {
  const res = await api.post('/myPage/userInfo');
  return res.data;
};

export const getFavoriteBooks = async (): Promise<Book[]> => {
  const res = await api.post('/myPage/userPickBookList');
  return res.data;
};

export const getFavoriteBooksImages = async (): Promise<BookImg[]> => {
  const res = await api.post('/myPage/bookmarkImageList');
  return res.data;
};

export const updateProfileImage = async (file: File, isDefaultImage: boolean) => {
  const formData = new FormData();
  formData.append('file', file);

  const uploadUrl = isDefaultImage ? '/userImageInsert' : '/userImageUpdate';

  const res = await api.post(uploadUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const updateUserInfo = async (updateData: Partial<UserProfile>) => {
  const res = await api.post('/myPage/userInfoModify', updateData);
  return res.data;
};
// export const updateUserInfo = async (userInfo: UserProfile, editedNickName: string) => {
//   const res = await api.post('/myPage/userInfoModify', {
//     ...userInfo,
//     nickName: editedNickName,
//   });
//   return res.data;
// };

export const deleteProfileImage = async () => {
  const res = await api.post('/userImageDelete');
  return res.data;
};
