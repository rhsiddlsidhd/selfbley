import { motion, useInView, useScroll, useTransform, wrap } from "motion/react";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import IntroVideos from "../atoms/IntroVideos";
import Title from "../atoms/Title";
import Arrow from "../atoms/Arrow";
import useAnimationProgressStore, {
  AnimationType,
} from "../../stores/useAnimationProgress";

const Home = () => {
  const { type, setType } = useAnimationProgressStore();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.1 });
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 0.3], ["0%", "100%"]);

  useEffect(() => {
    console.log("isInView", isInView);
  }, [isInView]);

  const handleFadeAnimation = (
    type: AnimationType
  ): "show" | "hidden" | "exit" => {
    if (isInView) return "exit";

    return ["INITIAL_LOAD", "ADD_ANIMATION"].includes(type) ? "show" : "hidden";
  };

  const handleAnimationEnd = (type: AnimationType): void => {
    if (type === "INITIAL_LOAD") setType("ADD_ANIMATION");
  };

  return (
    <Container>
      <VideoWrapper>
        <SlideInOverlay style={{ width }}></SlideInOverlay>
        <IntroVideos />
        <TitleWrapper
          variants={fadeVariants}
          initial={{ opacity: 0 }}
          animate={handleFadeAnimation(type)}
          onAnimationComplete={() => handleAnimationEnd(type)}
        >
          <Title />
          {type === "ADD_ANIMATION" && <Arrow />}
        </TitleWrapper>
      </VideoWrapper>
      <AuotoScrollingTextWrapper ref={ref}>
        <h1>안녕하세요</h1>
        <h1>FE 개발자 신영재 입니다</h1>
      </AuotoScrollingTextWrapper>
    </Container>
  );
};

export default Home;
const VideoWrapper = styled.div`
  position: relative;
  height: 200vh;
  & > video {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    object-fit: cover;
    filter: brightness(85%);
    z-index: -1;
  }
`;

const AuotoScrollingTextWrapper = styled(motion.div)`
  height: 75vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & > h1 {
    width: 80%;
  }
`;

const SlideInOverlay = styled(motion.div)`
  height: 100%;
  position: absolute;
  background-color: black;
`;

const fadeVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
};

const TitleWrapper = styled(motion.h1)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Container = styled.div``;
