import VerticalLine from "../components/atoms/VerticalLine";
import { useEffect } from "react";
import useAnimationProgressStore from "../stores/useAnimationProgress";
import MainLoading from "../components/loading/MainLoading";
import Home from "../components/organism/Home";
import Marquee from "../components/organism/Marquee";
import InterView from "../components/organism/InterView";
import Scratch from "../components/organism/Scratch";
import BookSlider from "../components/organism/BookSlider";
import InteractiveScale from "../components/organism/InteractiveScale";

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
          <Home />
          <Marquee />
          <InterView />
          <Scratch />
          <BookSlider />
          <Marquee />
          {/*scoll에 연결된 scale animtion을 이용한 skill 을 알려주는 section */}
          <InteractiveScale />
          <div style={{ height: "100vh" }}></div>
        </>
      )}
    </>
  );
};

export default Main;
