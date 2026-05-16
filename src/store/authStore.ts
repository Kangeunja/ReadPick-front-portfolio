import { create } from "zustand";
import { persist } from "zustand/middleware"; // 새로고침 유지

interface User {
  userIdx: number;
  nickName: string;
  userName: string;
  email: string;
  adminAt: string;
  firstAt: string;
  id: string;
  pw: string;
}

interface AuthState {
  user: User | null; // 현재 로그인 유저
  setUser: (user: User) => void; // 로그인 저장
  logout: () => void; // 로그인 제거
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null });
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);

export default useAuthStore;
