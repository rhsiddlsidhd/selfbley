import styled from "styled-components";
import { motion } from "motion/react";
import { COLORS_KEY, FONT_SIZE_KEY } from "../../../types/style";
import Text from "../../atoms/Text";

export interface MarqueeTextProps {
  text: string;
  reverse?: boolean;
  deg?: number;
  fontSize?: FONT_SIZE_KEY;
  bgColor?: COLORS_KEY;
}

const Marquee = ({
  deg = 0,
  reverse = false,
  text,
  fontSize,
  bgColor,
}: MarqueeTextProps) => {
  const marqueeAnimation = {
    x: reverse ? [0, "50%"] : [0, "-50%"],
    transition: {
      duration: 25,
      ease: "linear",
      repeat: Infinity,
    },
  };
  //
  return (
    <MarqueeContainer $deg={deg} $reverse={reverse} $fontSize={fontSize}>
      <MarqueeTrack
        animate={marqueeAnimation}
        transition={{ ease: "linear" }}
        $bgColor={bgColor}
      >
        {Array.from({ length: 4 }, (_, i) => {
          return (
            <Text $fontWeight="bold" key={i}>
              {text}
            </Text>
          );
        })}
      </MarqueeTrack>
    </MarqueeContainer>
  );
};

export default Marquee;

const MarqueeContainer = styled.div<{
  $deg: number;
  $reverse: boolean;
  $fontSize?: FONT_SIZE_KEY;
}>`
  display: flex;
  justify-content: ${({ $reverse }) => ($reverse ? "end" : "start")};
  transform: ${({ $deg }) => `rotate(${$deg}deg)`};

  font-size: ${({ theme, $fontSize }) =>
    $fontSize ? theme.FONT_SIZE[$fontSize] : "clamp(4rem, 25vw, 14rem)"};
  /* overflow: hidden; */
`;

const MarqueeTrack = styled(motion.div)<{ $bgColor?: COLORS_KEY }>`
  white-space: nowrap;
  display: flex;
  background-color: ${({ theme, $bgColor }) =>
    $bgColor ? theme.COLORS[$bgColor] : theme.COLORS.black};
`;
