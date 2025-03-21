import { create } from "zustand";

type AnimationType =
  | "PAGE_TRANSITION"
  | "INITIAL_LOAD"
  | "PROJECT_DISPLAY"
  | "INITIAL";

interface UseAnimationProgressStore {
  type: AnimationType;
  setType: (state: AnimationType) => void;
}

const useAnimationProgressStore = create<UseAnimationProgressStore>((set) => ({
  type: "INITIAL",
  setType: (state: AnimationType) => set({ type: state }),
}));

export default useAnimationProgressStore;
