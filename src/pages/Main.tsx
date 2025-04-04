import VerticalLine from "../components/atoms/VerticalLine";
import { useEffect } from "react";
import useAnimationProgressStore from "../stores/useAnimationProgress";
import MainLoading from "../components/loading/MainLoading";
import Home from "../components/organism/Home";
import Marquee from "../components/organism/Marquee";
import InterView from "../components/organism/InterView";
import Scratch from "../components/organism/Scratch";
import Skills from "../components/organism/Skills";

const Main = () => {
  const { type, setType } = useAnimationProgressStore();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return () => setType("INITIAL");
  }, [setType]);

  console.log("?");

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
          <Skills />
        </>
      )}
    </>
  );
};

export default Main;
