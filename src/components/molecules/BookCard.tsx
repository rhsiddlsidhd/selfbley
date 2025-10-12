import { styled } from "styled-components";
import useScreenStore, { Mode } from "../../stores/useScreenStore";
import DefaultCardBody from "../atoms/DefaultCardBody";
import Thumbnail from "../atoms/Thumbnail";

import useBookStore from "../../stores/bookStore";
import { useNavigate } from "react-router";
import { BookData } from "../template/section/SliderSection";

const BookCard = ({ book, idx }: { book: BookData; idx: number }) => {
  const { title, description, image, author, publisher } = book;
  const navigate = useNavigate();
  const mode = useScreenStore((state) => state.mode);
  const addBook = useBookStore((state) => state.addBook);
  const handleClick = (book: BookData) => {
    addBook(book);
    navigate(`/book?q=${book.isbn}`);
  };
  return (
    <BookCardContainer $mode={mode} onClick={() => handleClick(book)}>
      <Thumbnail src={image} />
      <DefaultCardBody
        idx={idx}
        mode={mode}
        title={title}
        author={author}
        publisher={publisher}
        description={description}
      />
    </BookCardContainer>
  );
};

export default BookCard;

const BookCardContainer = styled.div<{ $mode: Mode }>`
  min-width: 200px;
  width: ${({ $mode }) =>
    `calc(100vw / 6 * ${$mode === "mobile" ? 5 : $mode === "tablet" ? 4 : 2})`};
  max-width: 575px;
  aspect-ratio: 3/4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  background-color: white;
  color: black;
  cursor: pointer;

  margin: auto;

  &:hover {
    background-color: #ff6a41;
    p,
    h5,
    h6,
    h4 {
      color: white;
    }
  }
`;
