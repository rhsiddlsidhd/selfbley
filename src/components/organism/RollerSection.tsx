import { useMotionValueEvent, useScroll } from "motion/react";
import React, { useRef, useState } from "react";
import styled from "styled-components";

import SkillContent from "./SkillContent";

const RollerSection: React.FC = () => {
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
      {/* <BackgroundImage style={{ backgroundImage: `url(${winter})` }} /> */}

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

// const BackgroundImage = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   background-repeat: no-repeat;
//   background-size: cover;
// `;
