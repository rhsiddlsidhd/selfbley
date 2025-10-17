import {
  motion,
  MotionStyle,
  TargetAndTransition,
  Transition,
} from "motion/react";
import styled, { CSSProperties } from "styled-components";

const Image = ({
  src,
  alt,
  style,
  initial,

  animate,
  transition,
}: {
  src: string;
  alt: string;
  style?: CSSProperties | MotionStyle;
  transition?: Transition;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
}) => {
  return (
    <Img
      srcSet={src}
      initial={initial}
      animate={animate}
      alt={alt}
      style={style}
      transition={transition}
      loading="lazy"
    />
  );
};

export default Image;

const Img = styled(motion.img)`
  position: absolute;
  object-fit: contain;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 0.25rem;
`;
