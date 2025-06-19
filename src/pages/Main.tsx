import VerticalLine from "../components/atoms/VerticalLine";
import { lazy, Suspense, useEffect } from "react";
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

const Main = () => {
  const { type, setType } = useAnimationProgressStore();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setType("INITIAL");
  }, [setType]);
  //   const src = import.meta.env.VITE_BASE_URL;
  // useEffect(() => {
  //   const handleAsync = async () => {
  //     // const src = "http://localhost:8000";
  //     const res = await fetch(`${src}/projects`);
  //     const data = await res.json();
  //     // console.log("data", data);
  //   };
  //   handleAsync();
  // }, [src]);

  return (
    <motion.div style={{ backgroundColor: "black" }}>
      <VerticalLine page="MAIN" />
      <MainLoading
        onLoadingComplete={() => setType("PAGE_TRANSITION")}
        isVisible={type === "INITIAL"}
      />
      <PageWrapper $isVisible={type !== "INITIAL"}>
        <VideoSection />
        <MarqueeSection text="Dynamic & Alive" type="top" />
        <ParallaxSection />
        <ScratchSection />
        <SliderSection />
        <RollerSection />

        {type === "ADD_ANIMATION" && (
          <Suspense fallback={<h1>로딩중</h1>}>
            <ContactSection />
          </Suspense>
        )}
      </PageWrapper>
    </motion.div>
  );
};

export default Main;

const PageWrapper = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
  position: relative;
  height: fit-content;
`;
