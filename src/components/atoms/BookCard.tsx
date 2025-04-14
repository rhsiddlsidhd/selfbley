import React from "react";
import { styled } from "styled-components";
import { ExtendedBook } from "../organism/Skills";
import useScreenStore from "../../stores/useScreenStore";

const BookCard = ({ book, idx }: { book: ExtendedBook; idx: number }) => {
  const { description, id, formattedDate, src, title } = book;
  const mode = useScreenStore((state) => state.mode);
  return (
    <BookCardContainer>
      {id === "intro" ? (
        <BookCardBody>
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h6>{description}</h6>
          </div>
        </BookCardBody>
      ) : (
        <BookCardBody>
          <div className="meta">
            <h6 className="index">{mode !== "mobile" ? idx + 1 : idx}</h6>
            <p className="updated_at">{formattedDate}</p>
          </div>
          <div className="title">
            <p>{title}</p>
          </div>
          <div className="description">
            <p>{description}</p>
          </div>
        </BookCardBody>
      )}

      <BookCardThumbnail>
        <img src={src} alt="이미지" />
      </BookCardThumbnail>
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

const BookCardBody = styled.div`
  height: 60%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  word-break: keep-all;
  .meta {
    flex: 1 0 20%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-shrink: 0;
    gap: 0.5rem;
    & > h5,
    h6 {
      height: 50%;
    }
    .updated_at {
      width: fit-content;
      border-bottom: 1px solid white;
    }
  }
  .title {
    flex: 2 0 30%;
    font-weight: bold;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  .description {
    flex: 3 0 50%;
    /* font-size: clamp(0.725rem, 2vw, 1.5rem); */
  }
`;

const BookCardThumbnail = styled.div`
  border-radius: 1rem;
  width: 100%;
  height: 40%;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    object-fit: cover;
  }
`;
