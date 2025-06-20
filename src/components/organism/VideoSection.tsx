import { motion, useInView, useScroll, useTransform } from "motion/react";

import styled from "styled-components";
import IntroVideos from "../atoms/IntroVideos";
import Title from "../atoms/Title";
import Arrow from "../atoms/Arrow";

import { useMemo, useRef } from "react";
import { ARROR_ICON, HOMETITLE } from "../../constants/textConstants";
import SignSVGContainer from "./SignSVGContainer";
import { handleFadeAnimation } from "../../utils/validation";
import { AnimationProgressTypes } from "../../pages/Main";
// INITIAL

// 3가지 애니메이션 사용
// 1. background 커지는거
// 2. title이 SLIDE IN
// 3. Arrow FADE IN

const VideoSection = ({
  state,
  setState,
}: {
  state: AnimationProgressTypes;
  setState: React.Dispatch<React.SetStateAction<AnimationProgressTypes>>;
}) => {
  const containerRef = useRef(null);

  const isInView = useInView(containerRef, { amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const width = useTransform(scrollYProgress, [0, 1], ["0", "100%"]);
  const splitText = useMemo(() => HOMETITLE.toUpperCase().split(" "), []);

  return (
    <HomeContainer ref={containerRef}>
      <SignSVGContainer isView={isInView} section="videoSection" />
      <SlideInOverlay style={{ width }} />
      <Overlay
        initial={{ width: "20vw", height: "20%" }}
        animate={{ width: "100vw", height: "100%" }}
        transition={{ duration: 1, delay: 2 }}
        style={{
          display: isInView ? "block" : "none",
        }}
        onAnimationComplete={() => state === "SCALE" && setState("SLIDE")}
      >
        <IntroVideos isInView={isInView} />
      </Overlay>
      <TitleWrapper
        variants={fadeVariants}
        initial={{ opacity: 0 }}
        animate={handleFadeAnimation({ state, isInView })}
        onAnimationComplete={() => state === "SLIDE" && setState("FADE")}
      >
        {splitText.map((text) => {
          return <Title key={text} text={text} />;
        })}
        {state === "FADE" && <Arrow text={ARROR_ICON} />}
      </TitleWrapper>
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

const SlideInOverlay = styled(motion.div)`
  position: absolute;
  background-color: black;
  width: 100%;
  height: 100%;
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

const TitleWrapper = styled(motion.h1)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
`;
