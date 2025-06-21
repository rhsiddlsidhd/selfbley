import VerticalLine from "../components/atoms/VerticalLine";
import { useEffect, useState } from "react";
import MainLoading from "../components/loading/MainLoading";

import ParallaxSection from "../components/organism/ParallaxSection";
import ScratchSection from "../components/organism/ScratchSection";
import SliderSection from "../components/organism/SliderSection";
import RollerSection from "../components/organism/RollerSection";
import { motion } from "motion/react";

import styled from "styled-components";
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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.div
      style={{
        backgroundColor: "black",
        height: animationProgress === "INITIAL" ? "100vh" : "fit-content",
        overflow: animationProgress === "INITIAL" ? "hidden" : "visible",
      }}
    >
      <VerticalLine page="MAIN" />
      <MainLoading
        onLoadingComplete={() => setAnimationProgress("SCALE")}
        isVisible={animationProgress === "INITIAL"}
      />
      <PageWrapper
        initial={{ opacity: 0 }}
        animate={{
          opacity: animationProgress !== "INITIAL" ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <VideoSection
          state={animationProgress}
          setState={setAnimationProgress}
        />
        <MarqueeSection text="Dynamic & Alive" type="top" />
        <ParallaxSection />
        <ScratchSection />
        <SliderSection />
        <RollerSection />
        <ContactSection />
      </PageWrapper>
    </motion.div>
  );
};

export default Main;

const PageWrapper = styled(motion.div)`
  position: relative;
`;
