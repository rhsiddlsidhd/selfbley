import { useMotionValueEvent, useScroll } from "motion/react";
import React, { useRef, useState } from "react";
import styled from "styled-components";

import SkillContent from "./SkillContent";

const SkillSection: React.FC = () => {
  // const [activeIndex, setActiveIndex] = useState<number>(0);

  const [isSticky, setIsSticky] = useState<boolean>(false);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsSticky(latest > 0 && latest < 1);
  });

  /**
   * SkillSection
   * Container 구조
   * StickyWrapper 구조
   * ContentWrapper = > 스킬들을 보여주는 =  SkillContent
   * Title, Content = > title = overvie , Content = Roller
   * p , Roller - RollerItem - SkillFont
   */

  return (
    <Container ref={containerRef}>
      <StickySection
        style={{ position: isSticky ? "sticky" : "static", top: 0 }}
      >
        {/* 컨텐츠 : skills 목록들을 grid 형태의 카드 형식으로 보여준다 */}
        {/* <Skills isSticky={isSticky} scroll={scrollYProgress} /> */}
        {/* 수정안: isSicky skills title들이 opacity로 나타난다. */}
        <SkillContent isSticky={isSticky} />
      </StickySection>
    </Container>
  );
};

export default SkillSection;

const Container = styled.section`
  position: relative;
  width: 100vw;
  height: 150vh;
  background-color: black;
`;

const StickySection = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
