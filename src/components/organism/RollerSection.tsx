import { useMotionValueEvent, useScroll } from "motion/react";
import React, { useRef, useState } from "react";
import styled from "styled-components";

import SkillContent from "./SkillContent";

const RollerSection: React.FC = () => {
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
        style={{ position: isSticky ? "sticky" : "relative", top: 0 }}
      >
        <SkillContent isSticky={isSticky} />
      </StickySection>
    </Container>
  );
};

export default RollerSection;

const Container = styled.section`
  position: relative;
  height: 150vh;
  background-color: black;
`;

const StickySection = styled.div`
  height: 100vh;
  overflow: hidden;
  z-index: 90;
`;
