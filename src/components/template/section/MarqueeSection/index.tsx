import styled from "styled-components";
import Paint from "../../../atoms/Paint";
import Marquee, { MarqueeTextProps } from "../../../molecules/Marquee";
import SignSVGContainer from "../../../organism/SignSVGContainer";

const MarqueeSection = ({ text, reverse, deg }: MarqueeTextProps) => {
  return (
    <Container>
      <Paint
        src={"/paint/paint1.svg"}
        width={`calc(100% / 6 * 2)`}
        top="30%"
        left="10%"
      />
      <Paint
        src={"/paint/paint6.svg"}
        width={`calc(100% / 6 * 2)`}
        bottom="30%"
        right="0"
      />
      <SignSVGContainer
        isView={true}
        section="topMarqueeSection"
        $position="absolute"
      />
      <Marquee text={text} reverse={reverse} deg={deg} />
    </Container>
  );
};
export default MarqueeSection;

const Container = styled.section`
  position: relative;
  height: 100vh;
  min-height: fit-content;
  background-color: black;
  overflow: hidden;
  display: flex;
  align-items: center;
  z-index: 5;
`;
