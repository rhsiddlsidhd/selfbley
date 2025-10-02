import { useRef } from "react";
import styled from "styled-components";
import { motion } from "motion/react";

interface MarqueeTextProps {
  text: string;
  reverse?: boolean;
  deg?: number;
}

const Marquee = ({ deg = 0, reverse = false, text }: MarqueeTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const marqueeAnimation = {
    x: reverse ? [0, "100%"] : [0, "-50%"],
    transition: {
      duration: 10,
      ease: "linear",
      repeat: Infinity,
    },
  };

  return (
    <MarqueeTrack ref={containerRef}>
      <MarqueeMessage
        animate={marqueeAnimation}
        transition={{ ease: "linear" }}
        $deg={deg}
        $reverse={reverse}
      >
        {Array.from({ length: 2 }, (_, i) => {
          return (
            <Text key={i}>
              {[...text].map((word, i) => {
                return (
                  <motion.span
                    initial={{ filter: "blur(0px)" }}
                    animate={{
                      filter: "blur(10px)",
                      transition: {
                        delay: i * 0.25,
                        duration: 3,
                        repeat: Infinity,
                      },
                    }}
                    key={`${i}-${word}`}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </Text>
          );
        })}
      </MarqueeMessage>
    </MarqueeTrack>
  );
};

export default Marquee;

const MarqueeTrack = styled.div`
  white-space: nowrap;
  font-size: clamp(4rem, 25vw, 14rem);
`;

const MarqueeMessage = styled(motion.div)<{ $deg: number; $reverse: boolean }>`
  display: flex;
  justify-content: ${({ $reverse }) => ($reverse ? "end" : "start")};
  transform: ${({ $deg }) => `rotate(${$deg}deg)`};
  cursor: pointer;
  will-change: transform;
`;

const Text = styled.h1`
  font-size: inherit;
  padding: 0 1rem;
  z-index: 90;
`;
