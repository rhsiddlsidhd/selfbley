import styled from "styled-components";
import VerticalLine from "../components/atoms/VerticalLine";
import tennis from "../assets/tennis.mp4";
import snowboard from "../assets/snowboard.mp4";
import programming from "../assets/programming.mp4";
import run from "../assets/run.mp4";
import intro from "../assets/intro4.png";

import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

const Main = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const videos = [`${tennis}`, `${snowboard}`, `${run}`, `${programming}`];
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % videos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [videos.length]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeIndex]);

  return (
    <Container>
      {/* <MainLoading /> */}
      <VerticalLine page="MAIN" />

      <Home>
        {videos.map((source, i) => {
          return (
            <motion.video
              poster={intro}
              key={i}
              loop
              muted
              autoPlay
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={source}
              initial={{ opacity: 1 }}
              animate={{ opacity: i === activeIndex ? 1 : 0 }}
              transition={{ duration: 0 }}
            />
          );
        })}
      </Home>
    </Container>
  );
};

export default Main;

const Container = styled.div``;

const Home = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  & > video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    opacity: 1;
    z-index: -2;
    filter: brightness(80%);
  }
`;
