import { motion } from "motion/react";
import React from "react";
import styled, { CSSProperties } from "styled-components";

interface SVGContainerProps {
  children: React.ReactNode;
  isInView: boolean;
  style?: CSSProperties;
  $width?: number;
}

const SVGContainer = ({
  children,
  isInView,
  style,
  $width,
}: SVGContainerProps) => {
  return (
    <SVGWrapper
      style={style}
      $width={$width}
      animate={{ opacity: isInView ? 1 : 0 }}
    >
      {children}
    </SVGWrapper>
  );
};

export default SVGContainer;

const SVGWrapper = styled(motion.aside)<Pick<SVGContainerProps, "$width">>`
  ${({ $width, theme }) => theme.responseWidth($width ?? 1)};
  position: absolute;
  border: 1px solid red;
  pointer-events: none;
  z-index: 30;
`;
