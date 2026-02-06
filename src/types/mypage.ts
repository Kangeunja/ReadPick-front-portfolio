import { UserProfile } from "./userProfile";

export interface MyPageOutletContext {
  userInfo: UserProfile;
  fetchUserInfo: () => void;
}
