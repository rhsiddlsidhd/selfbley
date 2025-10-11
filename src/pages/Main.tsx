import { useState } from "react";
import { motion } from "motion/react";
import { contactScratchText, scratchText } from "../constants/scratchConstants";
import HeroSection from "../components/template/section/HeroSection";
import styled from "styled-components";
import MarqueeSection from "../components/template/section/MarqueeSection";
import ParallaxSection from "../components/template/section/ParallaxSection";
import ScratchSection from "../components/template/section/ScratchSection";
import SliderSection from "../components/template/section/SliderSection";
import RollerSection from "../components/template/section/RollerSection";
import ContactSection from "../components/template/section/ContactSection";

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
      <ScreenReveal
        initial={{ scale: 0.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        onAnimationComplete={() => setAnimationProgress("SCALE")}
      />
      <HeroSection animationProgress={animationProgress} />
      <MarqueeSection text="역동성 생동감 공간감" />
      <ParallaxSection />
      <ScratchSection text={scratchText} />
      <SliderSection />
      <MarqueeSection text="가독성 재사용성 유지보수성" deg={5} />
      <RollerSection />
      <ScratchSection
        text={contactScratchText}
        bgColor="black"
        activeColor="#FFFFFF"
        inActiveColor="black"
      />
      <ContactSection />
    </motion.div>
  );
};

export default Main;

const ScreenReveal = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  box-shadow: 0 0 0 200vmax rgba(0, 0, 0, 1);
`;
