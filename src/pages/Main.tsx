import styled from "styled-components";
import VerticalLine from "../components/atoms/VerticalLine";
import { useEffect } from "react";
import { motion } from "motion/react";
import useAnimationProgressStore from "../stores/useAnimationProgress";
import MainLoading from "../components/loading/MainLoading";
import IntroVideos from "../components/atoms/IntroVideos";

const Main = () => {
  const title = "FRONTEND";

  const { type, setType } = useAnimationProgressStore();

  useEffect(() => {
    return () => setType("INITIAL");
  }, [setType]);

  return (
    <div>
      <VerticalLine page="MAIN" />
      {type === "INITIAL" ? (
        <MainLoading onLoadingComplete={() => setType("PAGE_TRANSITION")} />
      ) : (
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
          </TitleWrapper>
          {type === "ADD_ANIMATION" && (
            <motion.div
              initial={{ y: 20 }}
              animate={{
                y: 0,
                transition: {
                  duration: 1,
                  type: "spring",
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
              style={{ rotate: 90 }}
            >
              ⋙
            </motion.div>
          )}
        </Home>
      )}
    </div>
  );
};

export default Main;

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
`;

const Home = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
