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

// 데스크탑은 가로카드 모바일은 세로카드
//모바일이 아닐 경우 Des width : 60% height : 100%
//모바일 인 경우 Des width: 100% height : 40%

const Container = styled.div<{ $mode: Mode }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
  /* flex: ${({ $mode }) => ($mode !== "mobile" ? 0.6 : 0.4)};
  flex-grow: 0;
  flex-shrink: 0; */

  width: ${({ $mode }) => ($mode !== "mobile" ? "60%" : "100%")};
  height: ${({ $mode }) => ($mode !== "mobile" ? "100%" : "40%")};
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600;
    font-size: 1.125rem;
    margin-bottom: 0.25rem;
  }
  .author {
    display: flex;
    gap: 0.25rem;
    opacity: 0.5;
    font-size: 0.8rem;
    & > span {
      margin: auto;
    }
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
