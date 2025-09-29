import VerticalLine from "../components/atoms/VerticalLine";
import { useState } from "react";

import ParallaxSection from "../components/organism/ParallaxSection";
import ScratchSection from "../components/organism/ScratchSection";
import SliderSection from "../components/organism/SliderSection";
import RollerSection from "../components/organism/RollerSection";
import { motion } from "motion/react";
import ContactSection from "../components/organism/ContactSection";
import MarqueeSection from "../components/organism/MarqueeSection";
import VideoSection from "../components/organism/VideoSection";

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
      <VerticalLine page="MAIN" />
      <VideoSection state={animationProgress} dispatch={setAnimationProgress} />
      <MarqueeSection text="Dynamic & Alive" type="top" />
      <ParallaxSection />
      <ScratchSection />
      <SliderSection />
      <RollerSection />
      <ContactSection />
    </motion.div>
  );
};

export default Main;
