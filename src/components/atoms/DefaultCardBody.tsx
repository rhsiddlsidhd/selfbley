import React from "react";
import { Mode } from "../../stores/useScreenStore";
import styled from "styled-components";

interface DefaultCardBodyProps {
  mode: Mode;
  idx: number;
  formattedDate: string;
  title: string;
  description: string;
}

const DefaultCardBody = ({
  description,
  formattedDate,
  idx,
  mode,
  title,
}: DefaultCardBodyProps) => {
  return (
    <Container>
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
    </Container>
  );
};

export default DefaultCardBody;

const Container = styled.div`
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
