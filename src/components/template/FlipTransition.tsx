import { motion } from "motion/react";

import styled from "styled-components";
import useAnimationProgressStore from "../../stores/useAnimationProgress";
import { ReactNode } from "react";

const FlipTransition = ({
  color,
  count = 6,
  children,
}: {
  children: ReactNode;
  color?: string;
  count?: number;
}) => {
  const { type, setType } = useAnimationProgressStore();

  const total = count;
  const arrayLength = total - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      <ItemRow variants={containerVariants} initial="hidden" animate="visible">
        {Array.from({ length: total }, (_, i) => {
          const reversedIndex = arrayLength - i;
          const delay = reversedIndex * 0.1;
          return (
            <Item
              variants={sectionVariants}
              transition={{
                duration: 1,
                type: "tween",
                ease: "easeIn",
                delay,
              }}
              style={{ backgroundColor: color }}
              onAnimationComplete={() => {
                if (i === 0) {
                  setTimeout(() => {
                    setType("FLIP_TRANSITION");
                  }, 1000);
                }
              }}
              key={i}
            >
              <h1>{i}</h1>
            </Item>
          );
        })}
      </ItemRow>
      {type === "FLIP_TRANSITION" && children}
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
  z-index: 1;
`;

const Item = styled(motion.div)`
  flex: 1;

  transform-origin: right;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const sectionVariants = {
  hidden: { transform: "scaleX(0)" },
  visible: { transform: "scaleX(1)" },
};
