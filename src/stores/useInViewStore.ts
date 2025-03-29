import { create } from "zustand";

type Section = "HOME" | "MARQUEE";

interface UseInViewStore {
  inView: Section;
  setInView: (props: Section) => void;
}

const useInViewStore = create<UseInViewStore>((set) => ({
  inView: "HOME",
  setInView: (inView) => set({ inView }),
}));

export default useInViewStore;
