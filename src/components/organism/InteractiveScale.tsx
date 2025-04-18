import { useMotionValueEvent, useScroll } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useScreenStore from "../../stores/useScreenStore";
import Skills from "../molecules/Skills";

const InteractiveScale: React.FC = () => {
  //주 animation은 Tetris
  const mode = useScreenStore((state) => state.mode);
  const [responseiveRowItemCount, setResponseRowItemCount] =
    useState<number>(0);
  const [responseiveColItemCount, setResponseiveColItemCount] =
    useState<number>(0);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const rowCount = mode === "mobile" ? 1 : mode === "tablet" ? 2 : 3;
    const colCount = mode !== "desktop" ? 1 : 2;
    setResponseRowItemCount((prev) => (prev !== rowCount ? rowCount : prev));
    setResponseiveColItemCount((prev) => (prev !== colCount ? colCount : prev));
  }, [mode]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsSticky(latest > 0);
  });

  return (
    <Container ref={containerRef}>
      <StickySection
        style={{ position: isSticky ? "sticky" : "static", top: 0 }}
      >
        {/* 컨텐츠 : skills 목록들을 grid 형태의 카드 형식으로 보여준다 */}
        <Skills
          isSticky={isSticky}
          scroll={scrollYProgress}
          responseiveColItemCount={responseiveColItemCount}
          responseiveRowItemCount={responseiveRowItemCount}
        />
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
