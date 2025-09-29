import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { homeVideos } from "../../constants/videos";
import styled from "styled-components";
import ImageTransitionLoader from "../loading/ImageTransitionLoader";
// { isInView }: { isInView: boolean }
const IntroVideos = ({ isInView }: { isInView: boolean }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const count = useRef<number>(0);
  const [loaded, setLoaded] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const startTimeRef = useRef<number>(Date.now());
  const [minTimeReached, setMinTimeReached] = useState(false);

  const MIN_LOADING_TIME = 2000;

  useEffect(() => {
    startTimeRef.current = Date.now();

    const minTimer = setTimeout(() => {
      setMinTimeReached(true);
    }, MIN_LOADING_TIME);

    return () => clearTimeout(minTimer);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % homeVideos.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;
    videoRefs.current.forEach((video, index) => {
      if (video && isInView) {
        const videoElement = video as HTMLVideoElement;

        if (index === activeIndex) {
          videoElement.currentTime = 0;
          videoElement.play().catch(() => {});
        } else {
          videoElement.pause();
          videoElement.currentTime = 0;
        }
      }
    });
  }, [activeIndex, isInView]);

  const handleVideoLoaded = () => {
    count.current += 1;

    if (count.current === homeVideos.length) {
      const elapsedTime = Date.now() - startTimeRef.current;
      console.log(`All videos loaded in: ${elapsedTime}ms`);

      if (elapsedTime >= MIN_LOADING_TIME) {
        setLoaded(true);
      } else {
        const remainingTime = MIN_LOADING_TIME - elapsedTime;
        setTimeout(() => {
          setLoaded(true);
        }, remainingTime);
      }
    }
  };

  const shouldShowContent = loaded && minTimeReached;
  return (
    <Videowrapper>
      {!shouldShowContent && <ImageTransitionLoader />}
      {homeVideos.map((video, i) => {
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
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          >
            <source src={video.webm} type="video/webm" />
          </Video>
        );
      })}
    </Videowrapper>
  );
};

export default IntroVideos;

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
  filter: blur(5px);
`;
