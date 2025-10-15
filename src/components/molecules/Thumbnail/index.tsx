import { motion, Variants } from "motion/react";
import styled from "styled-components";
// size를 어떻게 받을지 고민

interface ThumbnailProps {
  children: React.ReactNode;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onClick?: () => void;
  variants?: Variants;
  href?: string;
  target?: string;
  $width?: string;
  $height?: string;
  $aspectRatio?: string;
}

const Thumbnail = ({
  children,
  onHoverStart,
  onHoverEnd,
  onClick,
  variants,
  target,
  href,
  $width,
  $height,
  $aspectRatio,
}: ThumbnailProps) => {
  return (
    <ImgWrapper
      whileTap={{ scale: onClick ? 0.95 : 1 }}
      whileHover={{ scale: onHoverStart ? 1.05 : 1 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      href={href ?? "#"}
      $width={$width}
      $height={$height}
      $aspectRatio={$aspectRatio}
      target={target ?? "_self"}
      variants={variants}
    >
      {children}
    </ImgWrapper>
  );
};

export default Thumbnail;

const ImgWrapper = styled(motion.a)<
  Pick<ThumbnailProps, "$width" | "$height" | "$aspectRatio">
>`
  display: block;
  position: relative;
  width: ${({ $width }) => `${$width ?? "fit-content"}`};
  height: ${({ $height }) => `${$height ?? "fit-content"}`};
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio ?? "auto"};
  padding: 0.5rem 0;
  overflow: hidden;
`;
