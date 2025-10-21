import { styled } from "styled-components";

import { useNavigate } from "react-router";
import { BookData } from "../../organism/BooksSection";
import React, { useCallback } from "react";
import useScreenStore from "../../../stores/screenStore";
import Thumbnail from "../Thumbnail";
import Text from "../../atoms/Text";
import Image from "../../atoms/Image";
import useBookStore from "../../../stores/bookStore";
import Card from "../../atoms/Card";

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
    <Card onClick={() => handleClick(book)}>
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
    </Card>
  );
});

export default BookCard;

const Description = styled.div`
  height: 40%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
`;
