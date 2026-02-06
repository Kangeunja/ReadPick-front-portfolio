import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist", // 저장 키
  storage: sessionStorage, // sessionStorage 사용
});

export const bookmarkState = atom({
  key: "bookmarkState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
