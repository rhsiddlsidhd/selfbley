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
import Image from "../../atoms/Image";
import { technologys } from "../../../constants/technology";
import useSlot from "../../../hooks/useSlot";

const title = "the technologies";

export type TechnologyKeys = keyof typeof technologys;

const SlotMachineIcon = ({ isHover }: { isHover: TechnologyKeys | null }) => {
  const entries = Object.entries(technologys);
  return (
    <AnimatePresence>
      {entries.map(([category, techList], i) => {
        const isKey = isHover === category;

        return (
          <IconWrapper
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: isKey ? 0 : "100%", opacity: isKey ? 1 : 0 }}
            exit={{ y: "100%", opacity: 0 }}
            key={i}
          >
            {techList.map((tech, i) => (
              <Icon key={i}>
                <Image src={`/skills/${tech}.svg`} alt={tech} />
              </Icon>
            ))}
          </IconWrapper>
        );
      })}
    </AnimatePresence>
  );
};

const TechnologiesSection: React.FC = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const setIsOpen = useModalStore((state) => state.setIsOpen);

  const {
    activeIndex,
    handleHoverEnd,
    handleHoverStart,
    isHover,
    isTransitioning,
    centerIndex,
  } = useSlot();

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsSticky(latest > 0 && latest < 1);
  });

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
        <AnimatePresence>
          {isSticky && (
            <ContentWrapper
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{ opacity: 0, y: 10 }}
            >
              <SlotMachine
                activeIndex={activeIndex}
                isHover={isHover}
                isTransitioning={isTransitioning}
                handleHoverEnd={handleHoverEnd}
                handleHoverStart={handleHoverStart}
                centerIndex={centerIndex}
              />
            </ContentWrapper>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSticky && (
            <ButtonWrapper
              initial={{ x: "50%", opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ x: 0 }}
              whileTap={{ opacity: 0.95 }}
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
        </AnimatePresence>

        <SlotMachineIcon isHover={isHover} />
      </StickySection>
    </Container>
  );
};

export default TechnologiesSection;

const ContentWrapper = styled(motion.div)`
  ${({ theme }) => theme.responseWidth(2)}
  overflow: hidden;
  height: 45vh;
`;
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

const IconWrapper = styled(motion.div)`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: end;
  flex-wrap: wrap;
  gap: 0.5rem;
  border-radius: 10px;
  ${({ theme }) => theme.responseWidth(2.5)}
`;

const Icon = styled.div`
  width: ${({ theme }) => theme.FONT_SIZE.clamp2};
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.white};
`;
