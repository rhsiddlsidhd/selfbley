import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import styled from "styled-components";

import ImageTransitionLoader from "../../../components/loading/ImageTransitionLoader";
import useVideoIsReady from "../../../hooks/useVideoIsReady";
import useActiveIndex from "../../../hooks/useActiveIndex";

const videoLabels = ["tennis", "snowboard", "run", "programming"];

const Videos = ({ isInView }: { isInView: boolean }) => {
  const countRef = useRef<number>(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(
    new Array(videoLabels.length).fill(null)
  );

  const { isLoaded, handleVideoLoaded } = useVideoIsReady();

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
      <ImageTransitionLoaderContainer>
        {!isLoaded && <ImageTransitionLoader />}
      </ImageTransitionLoaderContainer>
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
              onCanPlayThrough={() => {
                countRef.current += 1;

                if (countRef.current === videoLabels.length) {
                  handleVideoLoaded();
                }
              }}
              animate={{ opacity: i === activeIndex ? 1 : 0 }}
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
  min-height: 100vh;
  z-index: -1;
`;

const Video = styled(motion.video)`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
`;

const ImageTransitionLoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
