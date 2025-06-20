import { create } from "zustand";
import { AnimationType } from "./useAnimationProgress";

interface UseProjectsAnimationProgress {
  type: AnimationType;
  setType: (state: AnimationType) => void;
}

const useProjectsAnimationProgress = create<UseProjectsAnimationProgress>(
  (set) => ({
    type: "INITIAL",
    setType: (state: AnimationType) => set({ type: state }),
  })
);

export default useProjectsAnimationProgress;
