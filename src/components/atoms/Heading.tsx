import React from "react";
import styled from "styled-components";
import { motion } from "motion/react";

interface HeadingProps {
  renderContent: string;
  ref?: React.Ref<HTMLHeadingElement | null>;
}

const Heading = ({ renderContent, ref }: HeadingProps) => {
  return (
    <Text ref={ref}>
      {[...renderContent].map((word, i) => {
        return (
          <motion.span
            initial={{ filter: "blur(0px)" }}
            animate={{
              filter: "blur(4px)",
              transition: {
                delay: i * 0.4,
                duration: 4,
                ease: "linear",
                repeat: Infinity,
              },
            }}
            key={`${i}- ${word} `}
          >
            {word}
          </motion.span>
        );
      })}
    </Text>
  );
};

export default Heading;

const Text = styled.h1`
  font-size: inherit;
`;
