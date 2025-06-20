import VerticalLine from "../components/atoms/VerticalLine";
import { lazy, Suspense, useEffect, useState } from "react";
import useAnimationProgressStore from "../stores/useAnimationProgress";
import MainLoading from "../components/loading/MainLoading";
import VideoSection from "../components/organism/VideoSection";
import MarqueeSection from "../components/organism/MarqueeSection";
import ParallaxSection from "../components/organism/ParallaxSection";
import ScratchSection from "../components/organism/ScratchSection";
import SliderSection from "../components/organism/SliderSection";
import RollerSection from "../components/organism/RollerSection";
import { motion } from "motion/react";
// const RollerSection = lazy(
//   () => import("../components/organism/RollerSection")
// );

const ContactSection = lazy(
  () => import("../components/organism/ContactSection")
);

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
    <motion.div style={{ backgroundColor: "black" }}>
      <VerticalLine page="MAIN" />
      <MainLoading
        onLoadingComplete={() => setAnimationProgress("SCALE")}
        isVisible={animationProgress === "INITIAL"}
      />
      <PageWrapper
        style={{ display: animationProgress !== "INITIAL" ? "block" : "none" }}
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

        {/* {type === "ADD_ANIMATION" && (
          <Suspense fallback={<h1>로딩중</h1>}>
            <ContactSection />
          </Suspense>
        )} */}
      </PageWrapper>
    </motion.div>
  );
};

export default Main;

const PageWrapper = styled.div`
  position: relative;
`;
