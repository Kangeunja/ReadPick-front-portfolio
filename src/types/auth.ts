export interface SignupFormData {
  userName: string;
  nickName: string;
  id: string;
  pw: string;
  pwConfirm: string;
  email: string;
}

export interface LoginRequest {
  id: string;
  pw: string;
}
