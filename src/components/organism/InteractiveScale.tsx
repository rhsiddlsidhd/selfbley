import { useMotionValueEvent, useScroll } from "motion/react";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Skills from "./Skills";

const InteractiveScale: React.FC = () => {
  //주 animation은 Tetris

  const [isSticky, setIsSticky] = useState<boolean>(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsSticky(latest > 0);
  });

  return (
    <Container ref={containerRef}>
      <StickySection
        style={{ position: isSticky ? "sticky" : "static", top: 0 }}
      >
        {/* 컨텐츠 : skills 목록들을 grid 형태의 카드 형식으로 보여준다 */}
        <Skills isSticky={isSticky} scroll={scrollYProgress} />
      </StickySection>
    </Container>
  );
};

export default InteractiveScale;

const Container = styled.section`
  position: relative;
  width: 100vw;
  height: 300vh;
  background-color: black;
`;

const StickySection = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 21;
`;
