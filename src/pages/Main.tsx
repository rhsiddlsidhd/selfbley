import { useState } from "react";
import ParallaxSection from "../components/organism/ParallaxSection";
import ScratchSection from "../components/organism/ScratchSection";
import SliderSection from "../components/organism/SliderSection";
import RollerSection from "../components/organism/RollerSection";
import { motion } from "motion/react";
import ContactSection from "../components/organism/ContactSection";
import HeroSection from "../components/organism/section/HeroSection";
import MarqueeSection from "../components/organism/section/marqueeSection/index";
import styled from "styled-components";

export type AnimationProgressTypes =
  | "INITIAL"
  | "SCALE"
  | "SLIDE"
  | "FADE"
  | "PENDING"
  | "FLIP";

const Main = () => {
  const [animationProgress, setAnimationProgress] =
    useState<AnimationProgressTypes>("INITIAL");

  return (
    <motion.div
      style={{
        position: "relative",
        height: animationProgress === "INITIAL" ? "100vh" : "fit-content",
        overflow: animationProgress === "INITIAL" ? "hidden" : "visible",
      }}
    >
      <HeroSection state={animationProgress} dispatch={setAnimationProgress} />
      <MarqueeSection />
      <ParallaxSection />
      <ScratchSection />
      <SliderSection />
      <Section></Section>
      <RollerSection />
      <ContactSection />
    </motion.div>
  );
};

export default Main;

const Section = styled.div`
  position: relative;
  height: 100vh;
  background-color: gray;
  z-index: 90;
`;
