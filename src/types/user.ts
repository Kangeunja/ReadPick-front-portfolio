export interface User {
  userIdx: number;
  nickName: string;
  userName: string;
  email: string;
  adminAt: string;
  firstAt: string;
  id: string;
}

export interface UserBaseDTO {
  userIdx: number;
  userName: string;
  nickName: string;
  id: string;
  pw: string;
  email: string;
  adminAt: string;
  firstAt: string;
}

export interface UserInfo {
  userIdx: number;
  nickName: string;
  fileName: string;
}
