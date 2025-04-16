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

  const skillTabs = ["lang", "fe", "be", "overview", "etc"];

  const n = useTransform(scrollYProgress, [0, 0.3], [200, 0]);
  const pos = useMotionTemplate`${n}%`;
  const neg = useMotionTemplate`-${n}%`;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsSticky(latest > 0);
  });

  return (
    <Container ref={containerRef}>
      <HexagonWrapper
        style={{ position: isSticky ? "sticky" : "static", top: 0 }}
      >
        <Hexagon
          animate={{
            width: isSticky ? "75%" : "100%",
            height: isSticky ? "75%" : "100%",
          }}
          transition={{ duration: 0.6 }}
        >
          <SkillBox style={{ x: neg }} className="lang"></SkillBox>
          <SkillBox style={{ y: neg }} className="fe">
            2
          </SkillBox>
          <SkillBox style={{ y: pos }} className="be">
            3
          </SkillBox>
          <SkillBox
            animate={{ scale: isSticky ? 1 : 2 }}
            transition={{ duration: 0.6 }}
            className="overview"
          >
            4
          </SkillBox>
          <SkillBox style={{ x: pos }} className="etc">
            5
          </SkillBox>
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
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Hexagon = styled(motion.div)`
  display: grid;
  grid-template-areas:
    "lang lang fe "
    "be overview fe"
    "be etc etc";
  gap: 1rem;
  .lang {
    grid-area: lang;
    background-color: red;
  }
  .fe {
    grid-area: fe;
    background-color: blue;
  }
  .be {
    grid-area: be;
    background-color: green;
  }
  .overview {
    grid-area: overview;
    background-color: yellow;
  }
  .etc {
    grid-area: etc;
    background-color: purple;
  }
`;

const SkillBox = styled(motion.div)``;
