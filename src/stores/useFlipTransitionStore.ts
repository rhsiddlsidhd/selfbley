import { create } from "zustand";

type TransitionState =
  | "INITIAL"
  | "IDLE"
  | "FADE"
  | "SLIDE"
  | "FLIP"
  | "PENDING";

interface UseFlipTransitionStore {
  type: TransitionState;
  setType: (state: TransitionState) => void;
}

const useFlipTransitionStore = create<UseFlipTransitionStore>((set) => ({
  type: "INITIAL",
  setType: (state: TransitionState) => set({ type: state }),
}));

export default useFlipTransitionStore;
