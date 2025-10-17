import { motion, TargetAndTransition } from "motion/react";
import styled from "styled-components";

interface VideoProps {
  src: string;
  animate?: TargetAndTransition;
  onCanPlayThrough?: () => void;
}

const Video = ({ src, animate, onCanPlayThrough }: VideoProps) => {
  return (
    <V
      animate={animate}
      onCanPlayThrough={onCanPlayThrough}
      muted
      autoPlay
      loop
      playsInline
      preload="auto"
    >
      <source src={src} type="video/webm" />
    </V>
  );
};

export default Video;

const V = styled(motion.video)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
