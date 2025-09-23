import { css, styled } from "styled-components";
import useScreenStore from "../../stores/useScreenStore";
import DefaultCardBody from "../atoms/DefaultCardBody";
import Thumbnail from "../atoms/Thumbnail";
import { BookData } from "../organism/SliderSection";
import useBookStore from "../../stores/bookStore";
import { useNavigate } from "react-router";

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
      <DefaultCardBody
        idx={idx}
        mode={mode}
        title={title}
        author={author}
        publisher={publisher}
        description={description}
      />
      <Thumbnail src={image} />
    </BookCardContainer>
  );
};

export default BookCard;

const BookCardContainer = styled.div<{ $mode: string }>`
  min-width: 200px;
  max-width: calc(100vw / 6 * 2);
  aspect-ratio: 3/ 4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  background-color: white;
  color: black;
  cursor: pointer;
  ${({ $mode }) =>
    $mode === "mobile" &&
    css`
      max-width: calc(100vw / 6 * 4);
    `}

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
