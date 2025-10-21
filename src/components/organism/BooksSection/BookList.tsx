import styled from "styled-components";
import BookCard from "../../molecules/BookCard";
import { BookData } from ".";

export const CARD_WRAPPER_WIDTH = 100;

const BookList = ({ books }: { books: BookData[] }) => {
  return books.map((book, idx) => {
    return (
      <SlideContainer key={idx} $width={CARD_WRAPPER_WIDTH}>
        <BookCard book={book} />
      </SlideContainer>
    );
  });
};

export default BookList;

const SlideContainer = styled.div<{ $width: number }>`
  width: ${({ $width }) => `${$width}vw`};
  min-width: 200px;
  margin: auto;
`;
