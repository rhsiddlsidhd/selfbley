import { motion } from "motion/react";
import React from "react";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  $width?: number;
  $height?: number;
  $borderRadiuse?: number;
  $backgroundColor?: string;
  $padding?: string;
}

const Button = ({
  children,
  $borderRadiuse,
  $backgroundColor,
  $padding,
  onClick,
}: ButtonProps) => {
  return (
    <Btn
      $borderRadiuse={$borderRadiuse}
      $backgroundColor={$backgroundColor}
      $padding={$padding}
      onClick={onClick}
    >
      {children}
    </Btn>
  );
};

export default Button;

const Btn = styled(motion.button)<
  Pick<
    ButtonProps,
    "$width" | "$height" | "$backgroundColor" | "$borderRadiuse" | "$padding"
  >
>`
  width: 100%;
  height: 100%;
  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor ?? theme.COLORS.orange};
  border-radius: ${({ $borderRadiuse }) => `${$borderRadiuse ?? 10}px`};
  border: none;
  padding: ${({ $padding }) => $padding ?? "0"};
  cursor: pointer;
`;
