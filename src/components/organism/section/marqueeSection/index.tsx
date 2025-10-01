import styled from "styled-components";
import Paint from "../../../atoms/Paint";
import Marquee from "../../../molecules/Marquee";
import SignSVGContainer from "../../SignSVGContainer";

const MarqueeSection = () => {
  return (
    <Container>
      <Paint
        src={"/paint/paint1.svg"}
        width={`calc(100% / 6 * 3)`}
        top="0%"
        left="10%"
      />
      <Paint
        src={"/paint/paint6.svg"}
        width={`calc(100% / 6 * 2)`}
        bottom="10%"
        right="0"
      />

      <SignSVGContainer
        isView={true}
        section="topMarqueeSection"
        $position="absolute"
      />
      <Marquee text="Dynamic" deg={3} />
      <Marquee text="Alive" reverse={true} />
      <Marquee text="Spatial depth" deg={-8} />
    </Container>
  );
};
export default MarqueeSection;

const Container = styled.section`
  position: relative;
  background-color: black;

  width: 100%;
  min-height: fit-content;
  height: 35vh;
  font-size: clamp(5rem, 8vw, 10rem);
  z-index: 1;
  overflow: hidden;
`;
