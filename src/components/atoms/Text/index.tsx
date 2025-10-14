import React from "react";
import styled, { css } from "styled-components";

// clamp 여부
// fontSize
// fontWeight
// opacity

type FontSize = "xs" | "sm" | "md" | "lg" | "xl";
type FontWeight = "light" | "normal" | "medium" | "semibold" | "bold";

const FONT_SIZE_MAP: Record<FontSize, string> = {
  xs: "0.7rem",
  sm: "0.85rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
};

const FONT_WEIGHT_MAP: Record<FontWeight, number> = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

interface TextProps {
  children: React.ReactNode;
  $clamp?: number;
  $fontSize?: FontSize;
  $fontWeight?: FontWeight;
  $opacity?: number;
}

const Text = ({
  children,
  $fontSize,
  $fontWeight,
  $opacity,
  $clamp,
}: TextProps) => {
  return (
    <P
      $clamp={$clamp}
      $fontSize={$fontSize}
      $fontWeight={$fontWeight}
      $opacity={$opacity}
    >
      {children}
    </P>
  );
};

export default Text;

const P = styled.p<Omit<TextProps, "children">>`
  ${({ $clamp }) =>
    $clamp &&
    css`
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${$clamp};
      overflow: hidden;
    `}
  font-size:${({ $fontSize }) => FONT_SIZE_MAP[$fontSize ?? "md"]};
  font-weight: ${({ $fontWeight }) => FONT_WEIGHT_MAP[$fontWeight ?? "normal"]};
  opacity: ${({ $opacity }) => $opacity ?? 1};
`;
