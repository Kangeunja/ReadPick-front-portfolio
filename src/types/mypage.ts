import { UserProfile } from './user';

export interface MyPageOutletContext {
  userInfo: UserProfile;
  fetchUserInfo: () => void;
}
