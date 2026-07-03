export interface User {
  userIdx: number;
  nickName: string;
  userName: string;
  fileName: string;
  email: string;
  adminAt: string;
  firstAt: string;
  id: string;
}

export interface UserProfile extends User {
  pw: string;
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
