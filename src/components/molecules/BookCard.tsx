import React from "react";
import { styled } from "styled-components";
import { ExtendedBook } from "../organism/BookSlider";
import useScreenStore from "../../stores/useScreenStore";
import Thumbnail from "../atoms/ThumbNail";

import IntroCardBody from "../atoms/IntroCardBody";
import DefaultCardBody from "../atoms/DefaultCardBody";

const BookCard = ({ book, idx }: { book: ExtendedBook; idx: number }) => {
  const { description, id, formattedDate, src, title } = book;
  const mode = useScreenStore((state) => state.mode);
  return (
    <BookCardContainer>
      {/* BOOkCARD 의 두가지 형태임 id가 intro 인가 아니면 북카드인가 */}
      {id === "intro" ? (
        <IntroCardBody description={description} />
      ) : (
        <DefaultCardBody
          idx={idx}
          mode={mode}
          formattedDate={formattedDate}
          title={title}
          description={description}
        />
      )}
      <Thumbnail src={src} />
    </BookCardContainer>
  );
};

export default BookCard;

const BookCardContainer = styled.div`
  min-width: 200px;
  max-width: calc(100vw / 6 * 4);
  aspect-ratio: 3/ 4;
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 1rem;

  &:hover {
    background-color: white;
    p,
    h5,
    h6,
    h4 {
      color: black;
    }
    .meta > .updated_at {
      border-bottom: 1px solid black;
    }
  }
`;
