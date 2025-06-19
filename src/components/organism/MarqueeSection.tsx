import Paint from "../atoms/Paint";
import Marquee from "../molecules/Marquee";
import styled from "styled-components";
import paint1 from "../../assets/splash_paint/paint7.svg";
import SignSVGContainer from "./SignSVGContainer";
type SectionType = "top" | "bottom";
interface MarqueeProps {
  text: string;
  type: SectionType;
  deg?: number;
  reverse?: boolean;
}

const MarqueeSection = ({ text, type, deg, reverse }: MarqueeProps) => {
  const MaqueeSectionConfig = {
    top: {
      height: "100vh",
      backgroundColor: "#111010",
      left: "0%",
    },
    bottom: {
      height: "75vh",
      backgroundColor: "#9E9E9E",
      left: "50%",
    },
  } as const;

  return (
    <Container
      style={{
        height: MaqueeSectionConfig[type].height,
        backgroundColor: MaqueeSectionConfig[type].backgroundColor,
      }}
    >
      <Paint
        src={paint1}
        width={`calc(100% / 6 * 3)`}
        height="50%"
        transform="translateY(-10%)"
        left={MaqueeSectionConfig[type].left}
      />
      <SignSVGContainer
        isView={true}
        section="topMarqueeSection"
        $position="absolute"
      />
      <Marquee deg={deg} reverse={reverse} text={text} />
    </Container>
  );
};
export default MarqueeSection;

const Container = styled.section`
  position: relative;
  width: 100%;
  font-size: clamp(5rem, 8vw, 10rem);
  z-index: 0;
  overflow: hidden;
`;
