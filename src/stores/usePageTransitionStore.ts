import { create } from "zustand";

export type PageTransitionState = "IDLE" | "ENTER" | "EXIT";

interface UsePageTransitionStore {
  state: PageTransitionState;
  setState: (state: PageTransitionState) => void;
}

const usePageTransitionStore = create<UsePageTransitionStore>((set) => ({
  state: "IDLE",
  setState: (state: PageTransitionState) => set({ state }),
}));

export default usePageTransitionStore;
