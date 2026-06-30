export interface SignupFormData {
  id: string;
  userName: string;
  nickName: string;
  email: string;
  pw: string;
  pwConfirm: string;
  currentPw?: string;
}

export interface LoginRequest {
  id: string;
  pw: string;
}
