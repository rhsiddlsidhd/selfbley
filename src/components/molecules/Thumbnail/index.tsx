import { motion } from "motion/react";
import styled from "styled-components";
// size를 어떻게 받을지 고민

interface ThumbnailProps {
  children: React.ReactNode;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onClick?: () => void;
  $width?: number;
  $height?: number;
}

const Thumbnail = ({
  children,
  onHoverStart,
  onHoverEnd,
  onClick,
  $width,
  $height,
}: {
  children: React.ReactNode;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onClick?: () => void;
  $width?: number;
  $height?: number;
}) => {
  return (
    <ImgWrapper
      whileTap={{ scale: onClick ? 0.95 : 1 }}
      whileHover={{ scale: onHoverStart ? 1.05 : 1 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      $width={$width}
      $height={$height}
    >
      {children}
    </ImgWrapper>
  );
};

export default Thumbnail;

const ImgWrapper = styled(motion.div)<
  Pick<ThumbnailProps, "$width" | "$height">
>`
  position: relative;
  width: ${({ $width }) => `${$width ?? 100}%`};
  height: ${({ $height }) => `${$height ?? 100}%`};
  padding: 0.5rem 0;
  overflow: hidden;
`;
