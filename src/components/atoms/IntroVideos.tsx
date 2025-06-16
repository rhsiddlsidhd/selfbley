import { useEffect, useRef, useState } from "react";
import intro from "../../assets/video/webm/snowboard.webm";
import { motion } from "motion/react";

import { homeVideosMp4, homeVideosWebm } from "../../constants/videos";
import styled from "styled-components";

const IntroVideos = ({ isInView }: { isInView: boolean }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % homeVideosMp4.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [isInView]);

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
      {homeVideosMp4.map((source, i) => (
        <Video
          key={i}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          muted
          autoPlay
          loop
          poster={intro}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: i === activeIndex ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <source src={source} type="video/webm" />
        </Video>
      ))}
    </>
  );
};

export default IntroVideos;

const Video = styled(motion.video)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  object-fit: cover;
  filter: blur(5px);
  z-index: -1;
  border: 3px solid white;
`;
