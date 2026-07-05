export interface SignupFormData {
  id: string;
  userName: string;
  nickName: string;
  email: string;
  pw: string;
  pwConfirm: string;
}

export interface LoginRequest {
  id: string;
  pw: string;
}

export interface UserProfileUpdateForm extends SignupFormData {
  currentPw: string;
}
