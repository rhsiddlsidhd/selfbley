import { motion, useInView, useScroll, useTransform } from "motion/react";
import styled from "styled-components";
import React, { useRef } from "react";
import { AnimationProgressTypes } from "../../../../pages/Main";
import SignSVGContainer from "../../SignSVGContainer";
import Videos from "../../../../layout/background/Videos";
import { handleFadeAnimation } from "../../../../utils/validation";
import { BottomArrowIcon } from "../../../atoms/Icon/index";

const WELCOMEINTRO = "hello World!";

const HeroSection = ({
  state,
  dispatch,
}: {
  state: AnimationProgressTypes;
  dispatch: React.Dispatch<React.SetStateAction<AnimationProgressTypes>>;
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const width = useTransform(scrollYProgress, [0, 1], ["0", "100%"]);

  return (
    <HomeContainer ref={containerRef}>
      <SignSVGContainer isView={isInView} section="hero" />
      <ScreenReveal
        initial={{ scale: 0.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        onAnimationComplete={() => dispatch("SCALE")}
      />
      <ScrollOverlay style={{ width }} />
      <Videos isInView={isInView} />
      <ContentWrapper
        variants={contentOpacity}
        initial="hidden"
        animate={handleFadeAnimation({ state: state, isInView })}
        onAnimationComplete={() =>
          dispatch((prev) => (prev === "SCALE" ? "FADE" : prev))
        }
      >
        {WELCOMEINTRO.toUpperCase()
          .split(" ")
          .map((text, i) => {
            return (
              <motion.p key={i} variants={contentTextItemReveal}>
                {text}
              </motion.p>
            );
          })}
        {state === "FADE" && (
          <IconWrapper
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: [10, 0, 10], opacity: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              type: "tween",
            }}
          >
            <BottomArrowIcon />
          </IconWrapper>
        )}
      </ContentWrapper>
    </HomeContainer>
  );
};

export default HeroSection;

const contentTextItemReveal = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const IconWrapper = styled(motion.div)`
  position: absolute;
  width: 10vw;
  aspect-ratio: 1/1;
  bottom: -50%;
`;

const HomeContainer = styled.section`
  position: relative;
  background-color: transparent;
  height: 200vh;
`;

const ScreenReveal = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  box-shadow: 0 0 0 200vmax rgba(0, 0, 0, 1);
`;

const ScrollOverlay = styled(motion.div)`
  position: absolute;
  background-color: black;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const contentOpacity = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
  exit: {
    display: "none",
  },
};

const ContentWrapper = styled(motion.h1)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 90;
`;
