import { create } from "zustand";

export type Mode = "desktop" | "tablet" | "mobile";

interface UseScreenStore {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const useScreenStore = create<UseScreenStore>((set) => ({
  mode: "desktop",
  setMode: (mode) => set({ mode }),
}));

export default useScreenStore;
