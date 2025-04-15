import { useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const InteractiveScale = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsSticky(latest > 0 && latest < 1);
  });

  useEffect(() => {
    console.log(isSticky);
  }, [isSticky]);

  return (
    <Container ref={containerRef}>
      <Hexagon style={{ position: isSticky ? "sticky" : "static" }}>
        <p>HELLOWORLD</p>
      </Hexagon>
    </Container>
  );
};

export default InteractiveScale;

const Container = styled.section`
  position: relative;
  width: 100vw;
  height: 200vh;
  background-color: #dfdede;
  /* padding: 2rem; */
`;

const Hexagon = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  top: 0;
  & > p {
    color: black;
  }
`;

/**
 * 1. static 시 Hexagon 하나가 화면 하나에 가득
 * 2. sticky 시에 Hexagon 총 5개가 들어가도록 size 줄어들기
 */
