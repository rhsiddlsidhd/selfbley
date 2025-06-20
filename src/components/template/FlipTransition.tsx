import { motion } from "motion/react";

import styled from "styled-components";

import { ReactNode, useState } from "react";
import { AnimationProgressTypes } from "../../pages/Main";

import SlideInXOverlay from "../atoms/SlideInXOverlay";

const FlipTransition = ({
  color,
  count = 6,
  children,
}: {
  children: ReactNode;
  color?: string;
  count?: number;
}) => {
  const [animationProgress, setAnimationProgress] =
    useState<AnimationProgressTypes>("INITIAL");

  const total = count;
  const arrayLength = total - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <ItemRow variants={containerVariants} initial="hidden" animate="show">
        {Array.from({ length: total }, (_, i) => {
          const reversedIndex = arrayLength - i;
          const delay = reversedIndex * 0.1;
          return (
            <Item
              variants={sectionVariants}
              transition={{
                duration: 0.3,
                type: "tween",
                ease: "easeIn",
                delay,
              }}
              style={{ backgroundColor: color }}
              onAnimationComplete={() => {
                if (i === 0) {
                  setAnimationProgress("FLIP");
                }
              }}
              key={i}
            />
          );
        })}
      </ItemRow>
      <SlideInXOverlay
        state={animationProgress}
        setState={setAnimationProgress}
        color={color}
      />
      <div style={{ opacity: animationProgress !== "INITIAL" ? 1 : 0 }}>
        {children}
      </div>
    </motion.div>
  );
};

export default FlipTransition;

const ItemRow = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 5;
`;

const Item = styled(motion.div)`
  flex: 1;
  transform-origin: right;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};

const sectionVariants = {
  hidden: { transform: "scaleX(0)" },
  show: { transform: "scaleX(1)" },
};
