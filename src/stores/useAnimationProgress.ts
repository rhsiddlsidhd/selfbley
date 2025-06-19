import { create } from "zustand";

export type AnimationType =
  | "PAGE_TRANSITION"
  | "INITIAL_LOAD"
  | "PROJECT_DISPLAY"
  | "INITIAL"
  | "ADD_ANIMATION"
  | "FLIP_TRANSITION"
  | "SLIDE_FADEOUT"
  | "BACKGROUND_VIDEO_VIEW"
  | "LOADING";

interface UseAnimationProgressStore {
  type: AnimationType;
  setType: (state: AnimationType) => void;
}

const useAnimationProgressStore = create<UseAnimationProgressStore>((set) => ({
  type: "INITIAL",
  setType: (state: AnimationType) => set({ type: state }),
}));

export default useAnimationProgressStore;
