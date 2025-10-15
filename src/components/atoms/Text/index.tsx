import React from "react";
import styled, { css } from "styled-components";
import { FONT_SIZE_KEY, FONT_WEIGHT_KEY } from "../../../types/style";

interface TextProps {
  children: React.ReactNode;
  $clamp?: number;
  $fontSize?: FONT_SIZE_KEY;
  $fontWeight?: FONT_WEIGHT_KEY;
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
  font-size: ${({ $fontSize, theme }) => theme.FONT_SIZE[$fontSize ?? "md"]};
  font-weight: ${({ $fontWeight, theme }) =>
    theme.FONT_WEIGHT[$fontWeight ?? "normal"]};
  opacity: ${({ $opacity }) => $opacity ?? 1};
`;
