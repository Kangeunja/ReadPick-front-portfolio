import api from './axiosInstance';
import { UserPickCategory } from 'types/user';

// 관심사 목록 가져오기 api
export const getUserPicks = async (): Promise<UserPickCategory[]> => {
  const res = await api.get('/userPick');
  return res.data;
};

// 유저 선택 결과 api
export const submitUserPicks = async (data: string[][]) => {
  const res = await api.post('/userPickResult', data);
  return res.data;
};
