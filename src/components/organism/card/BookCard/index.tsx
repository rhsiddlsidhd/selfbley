import { styled } from "styled-components";

import { useNavigate } from "react-router";
import { BookData } from "../../../template/section/BooksSection";
import useScreenStore, { Mode } from "../../../../stores/useScreenStore";
import useBookStore from "../../../../stores/bookStore";
import Thumbnail from "../../../molecules/Thumbnail";
import Image from "../../../atoms/Image";
import Text from "../../../atoms/Text";

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
      <Thumbnail $height={60}>
        <Image src={image} alt={`book-${idx}`} />
      </Thumbnail>

      <Description>
        <Text $clamp={2} $fontWeight="bold" $fontSize="lg">
          {title}
        </Text>
        <div>
          <Text $opacity={0.5} $fontSize="sm">
            {author} 지음
          </Text>
          <Text $opacity={0.5} $fontSize="sm">
            {publisher}
          </Text>
          {mode !== "mobile" && (
            <Text $clamp={5} $fontSize="sm">
              {description}
            </Text>
          )}
        </div>
      </Description>
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
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  background-color: white;
  color: black;
  cursor: pointer;
  margin: auto;

  &:hover {
    background-color: #ff6a41;
    p {
      color: white;
    }
  }
`;

const Description = styled.div`
  height: 40%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
`;
