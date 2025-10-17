import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import styled from "styled-components";

import ImageTransitionLoader from "../../../components/loading/ImageTransitionLoader";
import useVideoIsReady from "../../../hooks/useVideoIsReady";
import useActiveIndex from "../../../hooks/useActiveIndex";

const videoLabels = ["tennis", "snowboard", "run", "programming"];

const Videos = ({ isInView }: { isInView: boolean }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const { isLoaded, handleVideoLoaded } = useVideoIsReady({
    videoLength: videoLabels.length,
  });

  const { activeIndex } = useActiveIndex({ isInView, max: videoLabels.length });

  useEffect(() => {
    if (!videoRefs.current) return;
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      video.currentTime = 0;
      if (i === activeIndex && video.paused) video.play();

      if (i !== activeIndex && !video.paused) video.pause();
    });
  }, [activeIndex]);

  return (
    <Videowrapper>
      {!isLoaded && <ImageTransitionLoader />}
      {isInView &&
        videoLabels.map((label, i) => {
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
              <source src={`/video/${label}.webm`} type="video/webm" />
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
  z-index: -1;
`;

const Video = styled(motion.video)`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
`;
