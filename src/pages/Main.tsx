import VerticalLine from "../components/atoms/VerticalLine";
import { useEffect, useRef, useState } from "react";
import MainLoading from "../components/loading/MainLoading";

import ParallaxSection from "../components/organism/ParallaxSection";
import ScratchSection from "../components/organism/ScratchSection";
import SliderSection from "../components/organism/SliderSection";
import RollerSection from "../components/organism/RollerSection";
import { motion } from "motion/react";
import ContactSection from "../components/organism/ContactSection";
import MarqueeSection from "../components/organism/MarqueeSection";
import VideoSection from "../components/organism/VideoSection";
import { homeVideos } from "../constants/videos";

export type AnimationProgressTypes =
  | "INITIAL"
  | "SCALE"
  | "SLIDE"
  | "FADE"
  | "PENDING"
  | "FLIP";
const Main = () => {
  const MINIMUM_LOADING__TIME = 1000;
  const [animationProgress, setAnimationProgress] =
    useState<AnimationProgressTypes>("INITIAL");
  const startTimeRef = useRef<number>(Date.now());
  const totalCount = [...homeVideos].length;
  const loadingRef = useRef<boolean[]>(new Array(totalCount).fill(false));
  const [loaded, setLoaded] = useState<boolean>(false);

  const handelElementLoaded = (i: number) => {
    if (!loadingRef.current[i]) {
      loadingRef.current[i] = true;
      if (loadingRef.current.every(Boolean)) {
        const elapsed = Date.now() - startTimeRef.current;

        if (elapsed > MINIMUM_LOADING__TIME) {
          setLoaded((prev) => !prev && true);
        } else {
          setTimeout(
            () => setLoaded((prev) => !prev && true),
            MINIMUM_LOADING__TIME
          );
        }
      }
    }
  };

  useEffect(() => {
    console.log("loaded", loaded);
  }, [loaded]);
  return (
    <motion.div
      style={{
        position: "relative",
        backgroundColor: "black",
        height: animationProgress === "INITIAL" ? "100vh" : "fit-content",
        overflow: animationProgress === "INITIAL" ? "hidden" : "visible",
      }}
    >
      <VerticalLine page="MAIN" />
      <MainLoading
        onLoadingComplete={loaded}
        setState={() => setAnimationProgress("SCALE")}
        isVisible={animationProgress === "INITIAL"}
      />

      <VideoSection
        state={animationProgress}
        setState={setAnimationProgress}
        handelElementLoaded={(i) => handelElementLoaded(i)}
        loaded={loaded}
      />
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
