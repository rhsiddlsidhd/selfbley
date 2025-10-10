import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import styled from "styled-components";
import { homeVideos } from "../../../constants/videos";
import ImageTransitionLoader from "../../../components/loading/ImageTransitionLoader";
import useVideoIsReady from "../../../hooks/useVideoIsReady";
import useActiveIndex from "../../../hooks/useActiveIndex";

const Videos = ({ isInView }: { isInView: boolean }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const { isLoaded, handleVideoLoaded } = useVideoIsReady({
    videoLength: homeVideos.length,
  });

  const { activeIndex } = useActiveIndex({ isInView, max: homeVideos.length });

  useEffect(() => {
    if (!videoRefs.current) return;
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      video.pause();
      video.currentTime = 0;
      if (i === activeIndex) video.play();
    });
  }, [activeIndex]);

  return (
    <Videowrapper>
      {!isLoaded && <ImageTransitionLoader />}
      {isInView &&
        homeVideos.map((video, i) => {
          return (
            <Video
              key={i}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              onCanPlayThrough={handleVideoLoaded}
              animate={{ zIndex: i === activeIndex ? 10 : 0 }}
            >
              <source src={video.webm} type="video/webm" />
            </Video>
          );
        })}
    </Videowrapper>
  );
};

export default React.memo(Videos);

const Videowrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
`;

const Video = styled(motion.video)`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
`;
