import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const InteractiveScale: React.FC = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const n = useTransform(scrollYProgress, [0, 0.3], [150, 0]);
  const pos = useMotionTemplate`${n}%`;
  const neg = useMotionTemplate`-${n}%`;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsSticky(latest > 0 && latest < 1);
  });

  useMotionValueEvent(n, "change", (latest) => {
    console.log(latest);
  });

  return (
    <Container ref={containerRef}>
      <HexagonWrapper
        style={{ position: isSticky ? "sticky" : "static", top: 0 }}
      >
        <Hexagon $isSticky={isSticky}>
          <motion.div style={{ x: neg }} className="lang">
            1
          </motion.div>
          <motion.div style={{ y: neg }} className="fe">
            2
          </motion.div>
          <motion.div style={{ y: pos }} className="be">
            3
          </motion.div>
          <motion.div
            animate={{ scale: isSticky ? 1 : 2 }}
            transition={{ duration: 1 }}
            style={{ scale: 1 }}
            className="overview"
          >
            4
          </motion.div>
          <motion.div style={{ x: pos }} className="etc">
            5
          </motion.div>
        </Hexagon>
      </HexagonWrapper>
    </Container>
  );
};

export default InteractiveScale;

const Container = styled.section`
  position: relative;
  width: 100vw;
  height: 200vh;
  background-color: #dfdede;
`;

const HexagonWrapper = styled.div`
  width: 100%;
  height: 100vh;
  /* margin-top: 6rem; */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Hexagon = styled.div<{ $isSticky: boolean }>`
  width: ${({ $isSticky }) => ($isSticky ? "75%" : "100%")};
  height: ${({ $isSticky }) => ($isSticky ? "75%" : "100%")};
  transition: width 1s ease, height 1s ease;

  display: grid;
  grid-template-areas:
    "lang lang fe "
    "be overview fe"
    "be etc etc";
  gap: 1rem;
  .lang {
    grid-area: lang;
    background-color: red;
    /* transform: translate(-95%, 0); */
  }
  .fe {
    grid-area: fe;
    background-color: blue;
    /* transform: translate(0, -95%); */
  }
  .be {
    grid-area: be;
    background-color: green;
    /* transform: translate(0, 95%); */
  }
  .overview {
    grid-area: overview;
    background-color: yellow;
  }
  .etc {
    grid-area: etc;
    background-color: purple;
    /* transform: translate(95%, 0); */
  }
`;
