import VerticalLine from "../components/atoms/VerticalLine";
import { useEffect } from "react";
import useAnimationProgressStore from "../stores/useAnimationProgress";
import MainLoading from "../components/loading/MainLoading";
import Home from "../components/organism/Home";
import MarqueeSection from "../components/organism/MarqueeSection";
import ParallaxSection from "../components/organism/ParallaxSection";
import ScratchSection from "../components/organism/ScratchSection";
import BookSlider from "../components/organism/BookSlider";
import SkillSection from "../components/organism/SkillSection";
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
          <Home />
          <MarqueeSection text="Dynamic & Alive" deg={-10} padding="3rem 0" />
          <MarqueeSection text="Function Programming" reverse={true} />
          <ParallaxSection />
          <ScratchSection />
          <BookSlider />
          <MarqueeSection text="Architecture" padding="6rem 0" />
          <SkillSection />
          <ContactSection />
        </>
      )}
    </>
  );
};

export default Main;
