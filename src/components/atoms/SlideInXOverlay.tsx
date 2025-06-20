import { motion } from "motion/react";

import useScreenStore from "../../stores/useScreenStore";
import styled from "styled-components";

import { AnimationProgressTypes } from "../../pages/Main";

const SlideInXOverlay = ({
  state,
  setState,
  color,
}: {
  state: AnimationProgressTypes;
  setState: React.Dispatch<React.SetStateAction<AnimationProgressTypes>>;
  color?: string;
}) => {
  const mode = useScreenStore((state) => state.mode);

  return (
    <>
      {state === "FLIP" && (
        <Overlay
          initial="hidden"
          animate="show"
          exit="end"
          variants={mode === "mobile" ? mobileOverlay : overlay}
          onAnimationComplete={() => {
            setState("PENDING");
          }}
          style={{ backgroundColor: color }}
        />
      )}
    </>
  );
};
//
export default SlideInXOverlay;

const mobileOverlay = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
  end: { opacity: 0 },
};

const overlay = {
  hidden: { x: 0 },
  show: {
    opacity: 1,
    x: "calc((4 / 6) * 100vw - 100vw)",
    transition: { type: "tween", duration: 1 },
  },
  end: { display: "none" },
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 21;
`;
