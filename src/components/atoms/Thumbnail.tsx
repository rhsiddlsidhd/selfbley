import styled from "styled-components";
import useScreenStore, { Mode } from "../../stores/useScreenStore";

const Thumbnail = ({ src }: { src: string }) => {
  const mode = useScreenStore((state) => state.mode);

  // 데스크탑은 가로카드 모바일은 세로카드
  //가로 카드일 경우 썸네일 width : 40% height : 100%
  //세로 카드일 경우 썸네일 width : 100% height: 60%;

  return (
    <Container $mode={mode}>
      <img srcSet={src} alt="thumbnail" loading="lazy" />
    </Container>
  );
};

export default Thumbnail;

const Container = styled.div<{ $mode: Mode }>`
  width: ${({ $mode }) => ($mode !== "mobile" ? "40%" : "100%")};
  height: ${({ $mode }) => ($mode !== "mobile" ? "100%" : "60%")};
  /* flex: ${({ $mode }) => ($mode !== "mobile" ? 0.4 : 0.6)}; */
  /* flex-grow: 0; */
  /* flex-shrink: 0; */
  overflow: hidden;
  position: relative;
  border: 3px solid yellow;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;
