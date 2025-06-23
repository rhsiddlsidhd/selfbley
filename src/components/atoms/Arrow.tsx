import { motion } from "motion/react";
import styled from "styled-components";

const Arrow = () => {
  return (
    <ImgWrapper
      initial={{ y: 10, opacity: 0, x: "-50%" }}
      animate={{
        opacity: 1,
        y: 0,
        x: "-50%",
        transition: {
          duration: 1,
          type: "spring",
          repeat: Infinity,
          repeatType: "reverse",
        },
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 20 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 6 5.2929688 L 5.2910156 6 L 5.6464844 6.3535156 L 10 10.708984 L 14.353516 6.3535156 L 14.708984 6 L 14 5.2929688 L 13.646484 5.6464844 L 10 9.2929688 L 6.3535156 5.6464844 L 6 5.2929688 z M 6 9.2910156 L 5.2910156 9.9980469 L 5.6464844 10.351562 L 10 14.707031 L 14.353516 10.351562 L 14.708984 9.9980469 L 14 9.2910156 L 13.646484 9.6445312 L 10 13.291016 L 6.3535156 9.6445312 L 6 9.2910156 z "
          style={{
            fill: "currentcolor",
            fillOpacity: 1,
            stroke: "none",
            strokeWidth: 0,
          }}
        />
      </svg>
    </ImgWrapper>
  );
};

export default Arrow;

const ImgWrapper = styled(motion.div)`
  position: absolute;
  width: 10vw;
  aspect-ratio: 1/1;

  left: 50%;
  bottom: -50%;
`;
