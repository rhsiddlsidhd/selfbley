import { AnimatePresence, motion } from "motion/react";

import useScreenStore from "../../stores/useScreenStore";
import styled from "styled-components";
import useAnimationProgressStore from "../../stores/useAnimationProgress";

const SlideInXOverlay = () => {
  const mode = useScreenStore((state) => state.mode);
  const { setType, type } = useAnimationProgressStore();
  return (
    <AnimatePresence key={mode}>
      {type === "PAGE_TRANSITION" && (
        <Overlay
          initial="hidden"
          animate="show"
          exit="end"
          variants={mode === "mobile" ? mobileOverlay : overlay}
          onAnimationComplete={() => {
            setType("INITIAL_LOAD");
          }}
        />
      )}
    </AnimatePresence>
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffd34f;
  z-index: 11;
`;
