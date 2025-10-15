import { motion } from "motion/react";
import React from "react";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  $width?: number;
  $height?: number;
  $backgroundColor?: string;
}

const Button = ({ children, $backgroundColor, onClick }: ButtonProps) => {
  return (
    <Btn $backgroundColor={$backgroundColor} onClick={onClick}>
      {children}
    </Btn>
  );
};

export default Button;

const Btn = styled(motion.button)<
  Pick<ButtonProps, "$width" | "$height" | "$backgroundColor">
>`
  width: 100%;
  height: 100%;
  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor ?? theme.colors.orange};
  border-radius: 10px;
  cursor: pointer;
`;
