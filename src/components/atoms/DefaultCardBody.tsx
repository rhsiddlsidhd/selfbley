import useScreenStore, { Mode } from "../../stores/useScreenStore";
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
  const mode = useScreenStore((state) => state.mode);
  return (
    <Container $mode={mode}>
      <p className="title">{title}</p>
      <div>
        <p className="info">{author} 지음</p>
        <p className="info">{publisher}</p>
        {mode !== "mobile" && <p className="description">{description}</p>}
      </div>
    </Container>
  );
};

export default DefaultCardBody;

const Container = styled.div<{ $mode: Mode }>`
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 1rem;

  .title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;

    font-weight: 600;
    font-size: 1.125rem;
    margin-bottom: 0.25rem;
  }
  .info {
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
