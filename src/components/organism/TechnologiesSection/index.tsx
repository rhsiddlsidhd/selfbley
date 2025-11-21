import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Marquee from "../../molecules/Marquee/index";
import { PlusIcon } from "../../atoms/Icon";
import Button from "../../atoms/Button";
import { useModalStore } from "../../../stores/modalStore";
import SVGContainer from "../../template/container/SVGContainer";
import Sign from "../../atoms/Sign";
import SlotMachine from "./SlotMachine";

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

        <SVGContainer
          isInView={true}
          $width={2}
          style={{ bottom: "0%", left: "0" }}
        >
          <Sign type={3} />
        </SVGContainer>

        <AnimatePresence>{isSticky && <SlotMachine />}</AnimatePresence>

        {isSticky && (
          <ButtonWrapper
            initial={{ x: "50%", scale: 0 }}
            animate={{ scale: 1 }}
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
  background-color: ${({ theme }) => theme.COLORS.black};
`;

const StickySection = styled.div`
  ${({ theme }) => theme.FLEX_CENTER}
  position: sticky;
  top: 0;
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
