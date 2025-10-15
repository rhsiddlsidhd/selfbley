import styled from "styled-components";
import { motion } from "motion/react";

export interface MarqueeTextProps {
  text: string;
  reverse?: boolean;
  deg?: number;
}

const Marquee = ({ deg = 0, reverse = false, text }: MarqueeTextProps) => {
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
    <MarqueeContainer $deg={deg} $reverse={reverse}>
      <MarqueeTrack animate={marqueeAnimation} transition={{ ease: "linear" }}>
        {Array.from({ length: 4 }, (_, i) => {
          return (
            <Text key={i}>
              {[...text].map((word, i) => {
                return <motion.span key={`${i}-${word}`}>{word}</motion.span>;
              })}
            </Text>
          );
        })}
      </MarqueeTrack>
    </MarqueeContainer>
  );
};

export default Marquee;

const MarqueeContainer = styled.div<{ $deg: number; $reverse: boolean }>`
  display: flex;
  justify-content: ${({ $reverse }) => ($reverse ? "end" : "start")};
  transform: ${({ $deg }) => `rotate(${$deg}deg)`};
`;

const MarqueeTrack = styled(motion.div)`
  white-space: nowrap;
  font-size: clamp(4rem, 25vw, 14rem);
  display: flex;
  will-change: transform;
`;

const Text = styled.h1`
  font-size: inherit;
  padding: 0 1rem;
  z-index: 90;
`;
