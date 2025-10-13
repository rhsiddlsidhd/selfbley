import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { BookData } from "../../components/template/section/BooksSection";

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
