import { create } from "zustand";

export type AnimationType =
  | "PAGE_TRANSITION"
  | "INITIAL_LOAD"
  | "PROJECT_DISPLAY"
  | "INITIAL"
  | "ADD_ANIMATION";

interface UseAnimationProgressStore {
  type: AnimationType;
  setType: (state: AnimationType) => void;
}

const useAnimationProgressStore = create<UseAnimationProgressStore>((set) => ({
  type: "INITIAL",
  setType: (state: AnimationType) => set({ type: state }),
}));

export default useAnimationProgressStore;
