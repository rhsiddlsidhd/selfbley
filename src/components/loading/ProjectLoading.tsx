import { motion } from "motion/react";

import styled from "styled-components";

const ProjectLoading = ({
  onLoadingComplete,
}: {
  onLoadingComplete: () => void;
}) => {
  // mode 받아서 mobile일 때 4 그 외 6
  return (
    <Container
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onAnimationComplete={onLoadingComplete}
    >
      {Array.from({ length: 6 }, (_, i) => {
        return <motion.section variants={sectionVariants} key={i} />;
      })}
    </Container>
  );
};

export default ProjectLoading;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const sectionVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    backgroundColor: "#FFD34F",
    transition: { type: "tween", duration: 0.5 },
  },
};

const Container = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  background-color: transparent;
  & > section {
    flex: 1;
  }
  & > section:first-child,
  section:last-child {
    flex: 0.5;
  }
`;
