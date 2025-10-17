import React from "react";
import Button from "../../atoms/Button";
import { motion } from "motion/react";
import styled from "styled-components";

const FixedButton = ({
  children,
  onClick,
  $bottom,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  $bottom: string;
}) => {
  return (
    <FixedButtonWrapper
      $bottom={$bottom}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        $backgroundColor="black"
        $padding="0.25rem"
        $borderRadiuse={100}
        onClick={onClick}
      >
        {children}
      </Button>
    </FixedButtonWrapper>
  );
};

export default FixedButton;

const FixedButtonWrapper = styled(motion.div)<{ $bottom: string }>`
  position: fixed;
  ${({ theme }) => theme.responseWidth(0.5)};
  aspect-ratio: 1/1;
  bottom: ${(props) => props.$bottom};
  right: 1rem;
  z-index: 51;
  border: none;
`;
