import { motion } from "motion/react";
import styled from "styled-components";
import { ReactNode } from "react";
import useScreenStore from "../../../stores/useScreenStore";
import useProjectStore from "../../../stores/projectStore";

const FlipTransition = ({
  color,
  count = 6,
  children,
}: {
  children: ReactNode;
  color?: string;
  count?: number;
}) => {
  const setAnimationProgress = useProjectStore(
    (state) => state.setAnimationProgress
  );
  const mode = useScreenStore((state) => state.mode);
  const animationProgress = useProjectStore((state) => state.animationProgress);
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
                  const value = mode === "mobile" ? "PENDING" : "FLIP";
                  setAnimationProgress(value);
                }
              }}
              key={i}
            />
          );
        })}
      </ItemRow>

      {animationProgress === "FLIP" && (
        <motion.div
          style={{
            width: "100%",
            pointerEvents: "none",
            backgroundColor: color,
            position: "fixed",
            height: "100%",
            top: 0,
            zIndex: 10,
          }}
          initial="hidden"
          animate="show"
          onAnimationComplete={() => setAnimationProgress("PENDING")}
          variants={slideVariants}
        />
      )}

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

const slideVariants = {
  hidden: { x: 0, opacity: 1 },
  show: {
    x: "calc(-100% / 6 * 2)",
    opacity: 1,
    transition: { type: "tween", duration: 1, delay: 0.3 },
  },
};
