import { useInView, useScroll } from "motion/react";
import styled from "styled-components";
import { useRef } from "react";
import HeroContent from "../../../organism/content/HeroContent";
import ScaleOverlay from "../../../organism/overlay/ScaleOverlay";
import { AnimationProgressTypes } from "../../../../pages/HomePage";
import SVGContainer from "../../container/SVGContainer";
import Sign from "../../../atoms/Sign";
import Videos from "../../../../layout/background/Videos";

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
      <SVGContainer
        $width={2}
        style={{
          position: "fixed",
          top: "0%",
          right: 0,
        }}
        isInView={isInView}
      >
        <Sign type={0} />
      </SVGContainer>

      <SVGContainer
        $width={3}
        style={{
          position: "fixed",
          top: "15%",
          left: "5%",
        }}
        isInView={isInView}
      >
        <Sign type={2} />
      </SVGContainer>

      <SVGContainer
        $width={1.5}
        isInView={isInView}
        style={{ position: "fixed", bottom: "10%", right: "15%" }}
      >
        <Sign type={3} />
      </SVGContainer>

      <Videos isInView={isInView} />

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
