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
}

const Button = ({
  children,
  $borderRadiuse,
  $backgroundColor,
  onClick,
}: ButtonProps) => {
  return (
    <Btn
      $borderRadiuse={$borderRadiuse}
      $backgroundColor={$backgroundColor}
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
    "$width" | "$height" | "$backgroundColor" | "$borderRadiuse"
  >
>`
  width: 100%;
  height: 100%;
  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor ?? theme.COLORS.orange};
  border-radius: ${({ $borderRadiuse }) => `${$borderRadiuse ?? 10}px`};
  cursor: pointer;
`;
