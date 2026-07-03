import api from './axiosInstance';
import { BookDetail, BookImg } from '../types/book';
import { UserProfile } from '../types/user';

// 사용자 정보 조회 api
export const getUserInfo = async () => {
  const res = await api.post('/myPage/userInfo');
  return res.data;
};

// 찜 목록 조회 api
export const getFavoriteBooks = async (): Promise<BookDetail[]> => {
  const res = await api.post('/myPage/userPickBookList');
  return res.data;
};

// 찜 목록 이미지 조회 api
export const getFavoriteBooksImages = async (): Promise<BookImg[]> => {
  const res = await api.post('/myPage/bookmarkImageList');
  return res.data;
};

// 프로필 이미지 삭제 api
export const deleteProfileImage = async () => {
  const res = await api.post('/userImageDelete');
  return res.data;
};

// 프로필 이미지 등록/수정 api
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

// 회원정보 수정 api
export const updateUserInfo = async (updateData: Partial<UserProfile>) => {
  const res = await api.post('/myPage/userInfoModify', updateData);
  return res.data;
};
