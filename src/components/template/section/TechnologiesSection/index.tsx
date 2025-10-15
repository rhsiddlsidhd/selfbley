import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Marquee from "../../../molecules/Marquee/index";
import TechnologiesContent from "../../../organism/content/TechnologiesContent";
import { PlusIcon } from "../../../atoms/Icon";
import Button from "../../../atoms/Button";
import { useModalStore } from "../../../../stores/modalStore";

const title = "the technologies";

const TechnologiesSection: React.FC = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const setIsOpen = useModalStore((state) => state.setIsOpen);

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

        <AnimatePresence>{isSticky && <TechnologiesContent />}</AnimatePresence>
        {isSticky && (
          <ButtonWrapper
            initial={{ x: "50%", opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ x: 0 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              $width={0.25}
              $height={50}
              onClick={() => setIsOpen(true, "technologys")}
            >
              <PlusIcon />
            </Button>
          </ButtonWrapper>
        )}
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
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  overflow: hidden;
  z-index: 5;
`;

const ButtonWrapper = styled(motion.div)`
  ${({ theme }) => theme.responseWidth(0.25)};
  height: 50%;
  position: absolute;
  right: 0;
`;
