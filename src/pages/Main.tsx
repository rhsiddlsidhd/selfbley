import styled from "styled-components";
import VerticalLine from "../components/atoms/VerticalLine";
import { useEffect } from "react";
import { motion } from "motion/react";
import useAnimationProgressStore from "../stores/useAnimationProgress";
import MainLoading from "../components/loading/MainLoading";
import IntroVideos from "../components/atoms/IntroVideos";
import useScreenStore from "../stores/useScreenStore";

const Main = () => {
  const title = "FRONTEND";

  const { type, setType } = useAnimationProgressStore();
  const mode = useScreenStore((state) => state.mode);

  useEffect(() => {
    return () => setType("INITIAL");
  }, [setType]);
  console.log(mode);

  return (
    <Container>
      <VerticalLine page="MAIN" />
      {type === "INITIAL" ? (
        <MainLoading onLoadingComplete={() => setType("PAGE_TRANSITION")} />
      ) : (
        <>
          {/* <VerticalLine page="MAIN" /> */}
          <Home>
            <IntroVideos />
            <TitleWrapper
              variants={titleWrapper}
              initial={{ opacity: 0 }}
              animate={
                type === "INITIAL_LOAD" || type === "ADD_ANIMATION"
                  ? "show"
                  : "hidden"
              }
              onAnimationComplete={() => {
                if (type === "INITIAL_LOAD") {
                  setType("ADD_ANIMATION");
                }
              }}
            >
              {[...title].map((word, i) => {
                return (
                  <motion.span key={i} variants={titleItem}>
                    {word}
                  </motion.span>
                );
              })}
              {type === "ADD_ANIMATION" && (
                <motion.div
                  initial={{ y: -30, opacity: 0 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 1,
                      type: "spring",
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                  }}
                  style={{
                    position: "absolute",
                    rotate: 90,
                    x: "-50%",
                    y: "-50%",
                    bottom: "20%",
                    left: "50%",
                    transformOrigin: "56% 50% 0",
                  }}
                >
                  ⋙
                </motion.div>
              )}
            </TitleWrapper>
            <div style={{ height: "100vh", backgroundColor: "red" }}></div>
          </Home>
          {mode !== "mobile" && <FilpScrollSection></FilpScrollSection>}
          <div
            style={{
              height: "100vh",
            }}
          ></div>
        </>
      )}
    </Container>
  );
};

export default Main;

const FilpScrollSection = styled(motion.section)`
  height: 100vh;
  background-color: #91c091;
`;

const Container = styled.section`
  position: relative;
  background-color: blue;
`;

const titleWrapper = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const titleItem = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
    },
  },
};

const TitleWrapper = styled(motion.h1)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
`;

const Home = styled.div`
  position: relative;
  width: 100%;

  background-color: black;
  display: flex;
  flex-direction: column;

  & > video {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    filter: brightness(85%);
    z-index: -1;
  }
  z-index: 0;
`;
