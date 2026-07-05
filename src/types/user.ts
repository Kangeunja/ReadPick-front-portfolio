export interface User {
  userIdx: number;
  fileName: string;
  // adminAt: string;
}

export interface UserProfile extends User {
  id: string;
  userName: string;
  nickName: string;
  email: string;
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
