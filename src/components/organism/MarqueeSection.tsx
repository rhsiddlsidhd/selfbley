import Marquee from "../molecules/Marquee";
import styled from "styled-components";

interface MarqueeProps {
  text: string;
  deg?: number;
  reverse?: boolean;
  padding?: string;
}

const MarqueeSection = ({ text, deg, reverse, padding }: MarqueeProps) => {
  return (
    <Container $padding={padding}>
      <Marquee deg={deg} reverse={reverse}>
        {text}
      </Marquee>
    </Container>
  );
};
export default MarqueeSection;

const Container = styled.section<{ $padding?: string }>`
  position: relative;
  width: 100%;
  padding: ${({ $padding }) => $padding || 0};
  background-color: black;
  overflow: hidden;
  z-index: 1;
`;
