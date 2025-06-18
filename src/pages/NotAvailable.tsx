import { motion } from "motion/react";
import styled from "styled-components";

const NotAvailable = () => {
  return (
    <Wrapper>
      <VerticalBack
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div variants={sectionVariants} key={i}>
            {i}
          </motion.div>
        ))}
      </VerticalBack>
      <h1>ㅋㄷㅋㄷ</h1>
    </Wrapper>
  );
};

export default NotAvailable;

const VerticalBack = styled(motion.div)`
  display: flex;
  position: fixed;
  width: 100%;
  top: 0;
  height: 100vh;
  & > div {
    flex: 1;
    color: red;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
};

const sectionVariants = {
  hidden: { x: "500%", backgroundColor: "transparent" },
  visible: {
    x: 0,
    backgroundColor: "#FFD34F",
    transition: { type: "tween", duration: 0.5 },
  },
};

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100vh;

  z-index: 50;
`;
