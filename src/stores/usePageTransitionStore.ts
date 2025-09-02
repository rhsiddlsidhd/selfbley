import { create } from "zustand";

export type PageTransitionState = "LOADING" | "IDLE" | "ENTER" | "EXIT";

interface UsePageTransitionStore {
  state: PageTransitionState;
  setState: (state: PageTransitionState) => void;
}

const usePageTransitionStore = create<UsePageTransitionStore>((set) => ({
  state: "LOADING",
  setState: (state: PageTransitionState) => set({ state }),
}));

export default usePageTransitionStore;
