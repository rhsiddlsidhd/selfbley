import { useState } from "react";
import { motion } from "motion/react";

import styled from "styled-components";
import HeroSection from "../../components/template/section/HeroSection";
import HashTagSection from "../../components/template/section/HashTagSection";
import FAQSection from "../../components/template/section/FAQSection";
import DevPhilosophySection from "../../components/template/section/DevPhilosophySection";
import TechnologiesSection from "../../components/template/section/TechnologiesSection";
import BooksSection from "../../components/template/section/BooksSection";
import ContactSection from "../../components/template/section/ContactSection";

export type AnimationProgressTypes =
  | "INITIAL"
  | "SCALE"
  | "SLIDE"
  | "FADE"
  | "PENDING"
  | "FLIP";

const HomePage = () => {
  const [animationProgress, setAnimationProgress] =
    useState<AnimationProgressTypes>("INITIAL");

  return (
    <motion.div
      style={{
        position: "relative",
      }}
    >
      <ScreenReveal
        initial={{ scale: 0.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        onAnimationComplete={() => setAnimationProgress("SCALE")}
      />
      <HeroSection animationProgress={animationProgress} />
      <HashTagSection />
      <FAQSection />
      <DevPhilosophySection />
      <TechnologiesSection />
      <BooksSection />
      <ContactSection />
    </motion.div>
  );
};

export default HomePage;

const ScreenReveal = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  pointer-events: none;
  box-shadow: 0 0 0 200vmax rgba(0, 0, 0, 1);
`;
