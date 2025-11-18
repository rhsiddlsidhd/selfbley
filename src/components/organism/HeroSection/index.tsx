import { useInView, useScroll } from "motion/react";
import styled from "styled-components";
import { useRef } from "react";
import { AnimationProgressTypes } from "../../../pages/HomePage";
import SVGContainer from "../../template/container/SVGContainer";
import Sign from "../../atoms/Sign";
import Background from "./Background";
import ScrollBars from "./ScrollBars";
import IntroText from "./IntroText";

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
        $width={0.75}
        style={{
          position: "fixed",
          top: "15%",
          right: 0,
        }}
        isInView={isInView}
      >
        <Sign type={0} />
      </SVGContainer>

      <SVGContainer
        $width={0.5}
        style={{
          position: "fixed",
          top: "20%",
          left: "5%",
        }}
        isInView={isInView}
      >
        <Sign type={2} />
      </SVGContainer>

      <SVGContainer
        $width={1}
        isInView={isInView}
        style={{ position: "fixed", bottom: "10%", right: "15%" }}
      >
        <Sign type={3} />
      </SVGContainer>

      <Background isInView={isInView} />
      <ScrollBars scrollYProgress={scrollYProgress} />
      {animationProgress === "SCALE" && <IntroText isInView={isInView} />}
    </HomeContainer>
  );
};

export default HeroSection;

const HomeContainer = styled.section`
  position: relative;
  background-color: transparent;
  height: 200vh;
`;
