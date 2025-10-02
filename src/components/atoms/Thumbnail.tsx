import styled from "styled-components";
import useScreenStore, { Mode } from "../../stores/useScreenStore";

const Thumbnail = ({ src }: { src: string }) => {
  const mode = useScreenStore((state) => state.mode);

  return (
    <Container $mode={mode}>
      <img srcSet={src} alt="thumbnail" loading="lazy" />
    </Container>
  );
};

export default Thumbnail;

const Container = styled.div<{ $mode: Mode }>`
  flex: 6;
  overflow: hidden;
  position: relative;
  padding: 0.5rem 0;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
