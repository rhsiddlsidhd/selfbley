import { motion } from "motion/react";
import React from "react";
import styled from "styled-components";

const OpacityOverlay = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default OpacityOverlay;

const Container = styled(motion.div)`
  ${({ theme }) => theme.FLEX_CENTER}
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;
