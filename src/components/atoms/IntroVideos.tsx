import { useEffect, useRef, useState } from "react";
import tennis from "../../assets/tennis.mp4";
import snowboard from "../../assets/snowboard.mp4";
import programming from "../../assets/programming.mp4";
import run from "../../assets/run.mp4";
import { motion } from "motion/react";

import intro from "../../assets/intro4.png";
import useAnimationProgressStore from "../../stores/useAnimationProgress";

const IntroVideos = () => {
  const videos = [`${tennis}`, `${snowboard}`, `${run}`, `${programming}`];
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { setType, type } = useAnimationProgressStore();

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
    <>
      {videos.map((source, i) => (
        <motion.video
          key={i}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          muted
          autoPlay
          loop
          src={source}
          poster={intro}
          initial={{
            opacity: 1,
            clipPath: `polygon(45% 40%, 55% 40%, 55% 60%, 45% 60%)`,
          }}
          animate={{
            opacity: i === activeIndex ? 1 : 0,
            // clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
            clipPath:
              i === activeIndex
                ? `polygon(0 0, 100% 0, 100% 100%, 0 100%)`
                : `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
          }}
          onAnimationComplete={() => {
            if (activeIndex === 0 && type === "PAGE_TRANSITION") {
              setType("INITIAL_LOAD");
            }
          }}
          transition={{ clipPath: { duration: 1, delay: 1 } }}
          style={{ height: "100vh" }}
        />
      ))}
    </>
  );
};

export default IntroVideos;
