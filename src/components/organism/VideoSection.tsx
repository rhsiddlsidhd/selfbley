import { motion, useInView, useScroll, useTransform } from "motion/react";

import styled from "styled-components";
import IntroVideos from "../atoms/IntroVideos";
import Title from "../atoms/Title";
import Arrow from "../atoms/Arrow";
import useAnimationProgressStore, {
  AnimationType,
} from "../../stores/useAnimationProgress";
import { useRef } from "react";
import { ARROR_ICON, HOMETITLE } from "../../constants/textConstants";
import SignSVGContainer from "./SignSVGContainer";

const VideoSection = () => {
  const { type, setType } = useAnimationProgressStore();
  const containerRef = useRef(null);

  const isInView = useInView(containerRef, { amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["0", "100%"]);

  const handleFadeAnimation = (
    type: AnimationType
  ): "show" | "hidden" | "exit" => {
    if (!isInView) return "exit";

    return ["INITIAL_LOAD", "ADD_ANIMATION"].includes(type) ? "show" : "hidden";
  };

  const handleAnimationEnd = (type: AnimationType): void => {
    if (type === "INITIAL_LOAD") setType("ADD_ANIMATION");
  };

  const splitText = HOMETITLE.toUpperCase().split(" ");

  return (
    <HomeContainer ref={containerRef}>
      <SignSVGContainer isView={isInView} section="videoSection" />

      <Overlay
        initial={{ width: "20vw", height: "20%" }}
        animate={{ width: "100vw", height: "100%" }}
        transition={{ duration: 1, delay: 2 }}
        style={{
          opacity: isInView ? 1 : 0,
        }}
        onAnimationComplete={() => {
          if (type === "PAGE_TRANSITION") {
            setType("INITIAL_LOAD");
          }
        }}
      >
        <VideoWrapper>
          <IntroVideos isInView={isInView} />
        </VideoWrapper>
      </Overlay>

      <TitleWrapper
        variants={fadeVariants}
        initial={{ opacity: 0 }}
        animate={handleFadeAnimation(type)}
        onAnimationComplete={() => handleAnimationEnd(type)}
      >
        {splitText.map((text) => {
          return <Title key={text} text={text} />;
        })}
        {type === "ADD_ANIMATION" && <Arrow text={ARROR_ICON} />}
      </TitleWrapper>
      <SlideInOverlay style={{ width }} />
    </HomeContainer>
  );
};

export default VideoSection;

const HomeContainer = styled.section`
  position: relative;
  height: 200vh;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
`;

const VideoWrapper = styled.div`
  height: 100vh;
  position: relative;
`;

const SlideInOverlay = styled(motion.div)`
  position: absolute;
  background-color: black;
  height: 100%;
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
    display: "none",
  },
};

const TitleWrapper = styled(motion.h1)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;
