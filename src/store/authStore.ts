import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // 새로고침 유지
import { User } from '../types/user';

interface AuthState {
  user: User | null; // 현재 로그인 유저
  setUser: (user: User) => void; // 로그인 저장
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      logout: () => {
        set({ user: null });
        localStorage.removeItem('auth-storage');
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuthStore;
