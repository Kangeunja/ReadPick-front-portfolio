import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // 새로고침 유지
import { User } from '../types/user';

interface AuthState {
  user: User | null; // 현재 로그인 유저
  isInitialized: boolean;
  setUser: (user: User) => void; // 로그인 저장
  setInitialized: (val: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isInitialized: false,

      setUser: (user) => set({ user, isInitialized: true }),
      setInitialized: (val) => set({ isInitialized: val }),

      logout: () => {
        localStorage.removeItem('isLoggedInHint');
        set({ user: null, isInitialized: true }); // 데이터 비우고 자물쇠 풀기
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
