import VerticalLine from "../components/atoms/VerticalLine";
import { useEffect } from "react";
import useAnimationProgressStore from "../stores/useAnimationProgress";
import MainLoading from "../components/loading/MainLoading";
import Home from "../components/organism/Home";
import Marquee from "../components/organism/Marquee";
import InterView from "../components/organism/InterView";
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
          <Marquee text="Dynamic & Alive" deg={-10} padding="3rem 0" />
          <Marquee text="Function Component" reverse={true} />
          <InterView />
          <ScratchSection />
          <BookSlider />
          <Marquee text="Architecture" padding="6rem 0" />
          <SkillSection />
          <ContactSection />
        </>
      )}
    </>
  );
};

export default Main;
