import React from "react";
import styled, { css } from "styled-components";
import { FONT_SIZE_KEY, FONT_WEIGHT_KEY } from "../../../types/style";
import { motion, Variant } from "motion/react";

interface TextProps {
  children: React.ReactNode;
  variants?: Variant;
  $clamp?: number;
  $fontSize?: FONT_SIZE_KEY;
  $fontWeight?: FONT_WEIGHT_KEY;
  $opacity?: number;
  onClick?: () => void;
}

const Text = ({
  children,
  variants,
  $fontSize,
  $fontWeight,
  $opacity,
  $clamp,
  onClick,
}: TextProps) => {
  return (
    <P
      variants={variants}
      $clamp={$clamp}
      $fontSize={$fontSize}
      $fontWeight={$fontWeight}
      $opacity={$opacity}
      onClick={onClick}
    >
      {children}
    </P>
  );
};

export default Text;

const P = styled(motion.p)<Omit<TextProps, "children">>`
  ${({ $clamp }) =>
    $clamp &&
    css`
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${$clamp};
      overflow: hidden;
    `}
  font-size: ${({ $fontSize, theme }) => theme.FONT_SIZE[$fontSize ?? "md"]};
  font-weight: ${({ $fontWeight, theme }) =>
    theme.FONT_WEIGHT[$fontWeight ?? "normal"]};
  opacity: ${({ $opacity }) => $opacity ?? 1};
`;
