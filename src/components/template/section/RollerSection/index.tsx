import { useMotionValueEvent, useScroll } from "motion/react";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import SkillContent from "../../../organism/SkillContent";

const RollerSection: React.FC = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
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
      <StickySection style={{ position: "sticky", top: 0 }}>
        <SkillContent isSticky={isSticky} />
      </StickySection>
    </Container>
  );
};

export default RollerSection;

const Container = styled.section`
  position: relative;
  height: 150vh;
`;

const StickySection = styled.div`
  height: 100vh;
  overflow: hidden;
`;
