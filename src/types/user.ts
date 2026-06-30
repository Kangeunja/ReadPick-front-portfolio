export interface User {
  userIdx: number;
  nickName: string;
  userName: string;
  email: string;
  adminAt: string;
  firstAt: string;
  id: string;
}

export interface UserInfo {
  userIdx: number;
  nickName: string;
  fileName: string;
}

export interface UserProfile {
  userName: string;
  fileName: string;
  nickName: string;
  id: string;
  pw: string;
  email: string;
  adminAt: string;
  firstAt: string;
  userIdx: number;
}

export interface UserPickSubCategory {
  bsIdx: string;
  bssIdx: string;
  bssName: string;
}

export interface UserPickCategory {
  bsName: string;
  bssList: UserPickSubCategory[];
}
