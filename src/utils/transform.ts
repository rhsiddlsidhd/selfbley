import { Book } from "../constants/booksConstants";
import { Mode } from "../stores/useScreenStore";

export const getVisibleBooks = (books: Book[], mode: Mode, intro: string) => {
  return mode !== "mobile"
    ? books.filter((book) => book.description !== intro)
    : books;
};
