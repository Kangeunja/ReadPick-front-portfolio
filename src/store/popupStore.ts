import { create } from 'zustand';

interface PopupStore {
  message: string | null;
  openPopup: (message: string) => void;
  closePopup: () => void;
}

export const usePopupStore = create<PopupStore>((set) => ({
  message: null,
  openPopup: (message) => set({ message }),
  closePopup: () => set({ message: null }),
}));
