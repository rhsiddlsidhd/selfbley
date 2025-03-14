import { motion } from "motion/react";
import React from "react";
import styled from "styled-components";

const ProjectLoading = () => {
  return (
    <Container initial="hidden" animate="visible" variants={containerVariants}>
      {Array.from({ length: 4 }, (_, i) => {
        return <Section variants={sectionVariants} key={i}></Section>;
      })}
    </Container>
  );
};

export default ProjectLoading;

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.5,
      staggerDirection: -1,
    },
  },
  hidden: {},
};

const sectionVariants = {
  hidden: { rotateY: 0 },
  visible: {
    rotateY: 180,
    transition: { duration: 2 },
  },
};

const Container = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  perspective: 1000px;
  & > section {
    flex: 1;
    position: relative;
    background-color: transparent;
  }
  & > section:first-child,
  section:last-child {
    flex: 0.5;
  }
`;
// #7178857a
const Section = styled(motion.section)`
  /* border-right: 1px solid #7178857a; */
  transform-style: preserve-3d;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #b4b43e;
    transform: rotateY(180deg);
    backface-visibility: hidden;
  }
`;
