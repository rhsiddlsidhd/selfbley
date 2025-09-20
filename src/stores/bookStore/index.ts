import { create } from "zustand";
import { BookData } from "../../components/organism/SliderSection";
import { createJSONStorage, persist } from "zustand/middleware";

interface BookStore {
  book: BookData | null;
  addBook: (book: BookData) => void;
}

const useBookStore = create<BookStore>()(
  persist(
    (set) => ({
      book: null,
      addBook: (book: BookData) => set({ book }),
    }),
    {
      name: "book-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useBookStore;
