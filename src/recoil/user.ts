import { atom } from "recoil";

export const userState = atom({
  key: "userState", // 전역상태의 고유 키
  default: null,
});
