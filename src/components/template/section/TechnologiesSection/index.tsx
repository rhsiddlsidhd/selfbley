import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Marquee from "../../../molecules/Marquee/index";
import {
  VERTICAL_COUNT_2,
  VERTICAL_TOTAL_LINE,
} from "../../../../constants/skillsConstants";
import TechnologiesContent from "../../../organism/content/TechnologiesContent";
import SKillModalBtn from "../../../organism/SKillModalBtn";
import SkillModal from "../../../organism/SkillModal";

const title = "the technologies";

const TechnologiesSection: React.FC = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);

  const isToggleModal = useCallback(() => setIsModal((prev) => !prev), []);

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
      <StickySection>
        <MarqueeContainer>
          <Marquee text={title.toUpperCase()} />
        </MarqueeContainer>

        <AnimatePresence>
          {isSticky && (
            <ContentWrapper
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              $total={VERTICAL_TOTAL_LINE}
              $count={VERTICAL_COUNT_2}
            >
              <TechnologiesContent />
            </ContentWrapper>
          )}
        </AnimatePresence>
        <SKillModalBtn isSticky={isSticky} isModal={isToggleModal} />
        <SkillModal isModal={isModal} />
      </StickySection>
    </Container>
  );
};

export default TechnologiesSection;
const MarqueeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Container = styled.section`
  position: relative;
  height: 150vh;
  background-color: black;
`;

const StickySection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  z-index: 5;
`;

const ContentWrapper = styled(motion.div)<{ $total: number; $count: number }>`
  overflow: hidden;
  width: ${({ $count, $total }) => `calc(100% / ${$total} * ${$count})`};
  height: 50vh;
  overflow: hidden;
`;
