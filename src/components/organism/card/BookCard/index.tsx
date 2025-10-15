import { styled } from "styled-components";

import { useNavigate } from "react-router";
import { BookData } from "../../../template/section/BooksSection";
import useScreenStore, { Mode } from "../../../../stores/useScreenStore";
import useBookStore from "../../../../stores/bookStore";
import Thumbnail from "../../../molecules/Thumbnail";
import Image from "../../../atoms/Image";
import Text from "../../../atoms/Text";
import React, { useCallback } from "react";

const BookCard = React.memo(({ book }: { book: BookData }) => {
  const { title, description, image, author, publisher } = book;
  const navigate = useNavigate();
  const mode = useScreenStore((state) => state.mode);
  const addBook = useBookStore((state) => state.addBook);
  const handleClick = useCallback(
    (book: BookData) => {
      addBook(book);
      navigate(`/book?q=${book.isbn}`);
    },
    [addBook, navigate]
  );

  return (
    <BookCardContainer $mode={mode} onClick={() => handleClick(book)}>
      <Thumbnail $height="60%" $width="100%">
        <Image src={image} alt={title} />
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
});

export default BookCard;

const BookCardContainer = styled.div<{ $mode: Mode }>`
  ${({ theme, $mode }) =>
    $mode === "mobile"
      ? theme.responseWidth(5)
      : $mode === "tablet"
      ? theme.responseWidth(4)
      : theme.responseWidth(2)}

  min-width: 200px;
  max-width: 575px;
  aspect-ratio: 3/4;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  background-color: ${({ theme }) => theme.COLORS.white};
  color: ${({ theme }) => theme.COLORS.black};
  cursor: pointer;
  margin: auto;

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.orange};
    p {
      color: ${({ theme }) => theme.COLORS.white};
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
