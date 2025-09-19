import { Mode } from "../../stores/useScreenStore";
import styled from "styled-components";

interface DefaultCardBodyProps {
  mode: Mode;
  idx: number;
  author: string;
  title: string;
  description: string;
  publisher: string;
}

const DefaultCardBody = ({
  description,
  author,
  publisher,
  title,
}: DefaultCardBodyProps) => {
  return (
    <Container>
      <div>
        <p className="title">{title}</p>
        <p className="author">
          <span>{author} 지음</span>
          <span>{publisher}</span>
        </p>
      </div>
      <p className="description">{description}</p>
    </Container>
  );
};

export default DefaultCardBody;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
  height: 40%;
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600;
    font-size: 1rem;
  }
  .author {
    display: flex;
    gap: 0.25rem;
    opacity: 0.5;
    font-size: 0.8rem;
  }
  .description {
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.875rem;
  }
`;
