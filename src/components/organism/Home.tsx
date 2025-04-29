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

const Home = () => {
  const { type, setType } = useAnimationProgressStore();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
      <SlideInOverlay style={{ width }}></SlideInOverlay>
      <VideoWrapper $isInView={isInView}>
        <IntroVideos isInView={isInView} />
      </VideoWrapper>
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
    </HomeContainer>
  );
};

export default Home;

const SlideInOverlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  z-index: 1;
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

const VideoWrapper = styled.div<{ $isInView: boolean }>`
  & > video {
    width: 100%;
    height: 100%;
    position: ${({ $isInView }) => ($isInView ? "fixed" : "absolute")};
    top: 0;
    left: 0;
    object-fit: cover;
    filter: brightness(85%);
    z-index: -1;
  }
  opacity: ${({ $isInView }) => ($isInView ? 1 : 0)};
`;

const HomeContainer = styled.div`
  position: relative;
  height: 200vh;
`;

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
