import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean, payload?: unknown) => void;
  payload?: unknown;
}

const initialState: Omit<ModalStore, "setIsOpen"> = {
  isOpen: false,
  payload: null,
};

export const useModalStore = create<ModalStore>((set) => ({
  ...initialState,
  setIsOpen: (isOpen, payload) => set({ isOpen, payload: payload ?? null }),
}));
