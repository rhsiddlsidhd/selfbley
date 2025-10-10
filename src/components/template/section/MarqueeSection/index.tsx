import styled from "styled-components";
import Paint from "../../../atoms/Paint";
import Marquee from "../../../molecules/Marquee";
import SignSVGContainer from "../../../organism/SignSVGContainer";

const MarqueeSection = ({ text }: { text: string }) => {
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
      <Marquee text={text} />
    </Container>
  );
};
export default MarqueeSection;

const Container = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  height: 100vh;
  min-height: fit-content;
  background-color: black;
  z-index: 10;
  overflow: hidden;
`;
