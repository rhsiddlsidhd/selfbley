import { motion } from "motion/react";

import styled from "styled-components";

interface PaintProps {
  src: string;
  width: string;
  height: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  alt?: string;
  transform?: string;
}

const Paint = ({
  src,
  height,
  width,
  alt,
  bottom,
  left,
  right,
  top,
  transform,
}: PaintProps) => {
  return (
    <PaintBackground
      src={src}
      alt={alt}
      style={{
        width,
        height,
        bottom,
        left,
        right,
        top,
        transform: `${transform}`,
      }}
    />
  );
};

export default Paint;

const PaintBackground = styled(motion.img)`
  position: absolute;
  z-index: 1;
`;
