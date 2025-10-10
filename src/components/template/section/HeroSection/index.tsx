import { useInView, useScroll } from "motion/react";
import styled from "styled-components";
import { useRef } from "react";

import HeroBackground from "../../../organism/background/HeroBackground";
import HeroContent from "../../../organism/content/HeroContent";
import { AnimationProgressTypes } from "../../../../pages/Main";
import ScaleOverlay from "../../../organism/overlay/ScaleOverlay";

const HeroSection = ({
  animationProgress,
}: {
  animationProgress: AnimationProgressTypes;
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <HomeContainer ref={containerRef}>
      <HeroBackground isInView={isInView} />
      <ScaleOverlay scrollYProgress={scrollYProgress} />
      {animationProgress === "SCALE" && <HeroContent isInView={isInView} />}
    </HomeContainer>
  );
};

export default HeroSection;

const HomeContainer = styled.section`
  position: relative;
  background-color: transparent;
  height: 200vh;
`;
