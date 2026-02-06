import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist", // 저장 키
  storage: sessionStorage, // sessionStorage 사용
});

export interface User {
  userIdx: number;
  nickName: string;
  userName: string;
  email: string;
  adminAt: string;
  firstAt: string;
  id: string;
}

export const userInfoState = atom<User | null>({
  key: "userInfoState",
  default: null,
  // default: {
  //   userIdx: null,
  //   nickName: "",
  //   userName: "",
  //   email: "",
  //   adminAt: "",
  //   firstAt: "",
  //   id: "",
  // },
  effects_UNSTABLE: [persistAtom], // sessionStorage에 자동 저장
});
