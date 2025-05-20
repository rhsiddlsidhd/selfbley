import VerticalLine from "../components/atoms/VerticalLine";
import { useEffect } from "react";
import useAnimationProgressStore from "../stores/useAnimationProgress";
import MainLoading from "../components/loading/MainLoading";
import VideoSection from "../components/organism/VideoSection";
import MarqueeSection from "../components/organism/MarqueeSection";
import ParallaxSection from "../components/organism/ParallaxSection";
import ScratchSection from "../components/organism/ScratchSection";
import SliderSection from "../components/organism/SliderSection";
import RollerSection from "../components/organism/RollerSection";
import ContactSection from "../components/organism/ContactSection";

const Main = () => {
  const { type, setType } = useAnimationProgressStore();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return () => setType("INITIAL");
  }, [setType]);

  return (
    <>
      <VerticalLine page="MAIN" />
      {type === "INITIAL" ? (
        //
        <MainLoading onLoadingComplete={() => setType("PAGE_TRANSITION")} />
      ) : (
        <>
          {/* 컴포넌트명을 주 animation을 활용 */}
          <VideoSection />
          <MarqueeSection text="Dynamic & Alive" deg={-10} padding="3rem 0" />
          <MarqueeSection
            text="Function Programming"
            deg={-10}
            padding="3rem 0"
            reverse={true}
          />
          <MarqueeSection text="Architecture" padding="3rem 0" />
          <ParallaxSection />
          <ScratchSection />
          <SliderSection />
          <RollerSection />
          <ContactSection />
        </>
      )}
    </>
  );
};

export default Main;
