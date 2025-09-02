import { css, styled } from "styled-components";
import { ExtendedBook } from "../organism/SliderSection";
import useScreenStore from "../../stores/useScreenStore";
import IntroCardBody from "../atoms/IntroCardBody";
import DefaultCardBody from "../atoms/DefaultCardBody";
import Thumbnail from "../atoms/Thumbnail";

const BookCard = ({ book, idx }: { book: ExtendedBook; idx: number }) => {
  const { description, id, formattedDate, title, thumnail } = book;
  const mode = useScreenStore((state) => state.mode);
  /**
   * id === 'intro'
   * Container 자체를 따로 두어서 구분분
   */
  return (
    <BookCardContainer $mode={mode}>
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
      <Thumbnail src={thumnail} />
    </BookCardContainer>
  );
};

export default BookCard;

const BookCardContainer = styled.div<{ $mode: string }>`
  min-width: 200px;
  max-width: calc(100vw / 6 * 2);
  aspect-ratio: 3/ 4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  background-color: white;
  color: black;
  cursor: pointer;
  ${({ $mode }) =>
    $mode === "mobile" &&
    css`
      max-width: calc(100vw / 6 * 4);
    `}

  &:hover {
    background-color: #ff6a41;
    p,
    h5,
    h6,
    h4 {
      color: white;
    }
  }
`;
