import { Fade } from "basic-loading";
import { motion } from "motion/react";
import styled from "styled-components";

const LoadingContainer = () => {
  const option = {
    speed: 2,
  };
  return (
    <Container>
      <Fade option={option}>LOADING</Fade>
    </Container>
  );
};

export default LoadingContainer;

const Container = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
