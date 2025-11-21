import { AnimatePresence, motion } from "motion/react";
import styled from "styled-components";

import Image from "../../atoms/Image";
import useSlot from "../../../hooks/useSlot";
import { technologys } from "../../../constants/technology";

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

const SlotMachine = () => {
  const category = Object.keys(technologys) as TechnologyKeys[];
  const marqueeSkillsKeys: TechnologyKeys[] = [...category, ...category];
  const {
    activeIndex,
    handleHoverEnd,
    handleHoverStart,
    isHover,
    isTransitioning,
    centerIndex,
  } = useSlot();

  return (
    <ContentWrapper
      initial={{ scale: 0, y: 10 }}
      animate={{
        scale: 1,
        y: 0,
      }}
      exit={{ scale: 0, y: 10 }}
    >
      <SlotMachineWrapper
        transition={
          isTransitioning
            ? { duration: 0.6, ease: "easeInOut" }
            : { duration: 0 }
        }
        animate={{
          y: `-${activeIndex * (100 / 3)}%`,
        }}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        onTouchStart={handleHoverStart}
        onTouchEnd={handleHoverEnd}
      >
        {marqueeSkillsKeys.map((k, idx) => {
          const isCenter = idx === centerIndex;

          return (
            <SlotMachineItem
              initial={{ scale: 1 }}
              animate={{ scale: isCenter && isHover ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
              key={idx}
            >
              <div
                style={{
                  position: "relative",
                  fontSize: isCenter ? "4vw" : "3vw",
                  fontWeight: isCenter ? "bold" : "lighter",
                }}
              >
                {k.toUpperCase()}
                <Underline
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: isCenter && isHover ? 1 : 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </SlotMachineItem>
          );
        })}
      </SlotMachineWrapper>
      <SlotMachineIcon isHover={isHover} />
    </ContentWrapper>
  );
};

export default SlotMachine;

const ContentWrapper = styled(motion.div)`
  ${({ theme }) => theme.responseWidth(2)}
  overflow: hidden;
  height: 50vh;
`;

const Underline = styled(motion.div)`
  position: absolute;
  bottom: -0.5rem;
  border: 2px solid white;
  transform-origin: left;
  width: 100%;
`;
const SlotMachineItem = styled(motion.li)`
  ${({ theme }) => theme.FLEX_CENTER}
  flex: 3 0 calc(100% / 3);
`;

const SlotMachineWrapper = styled(motion.ul)`
  height: 100%;
  display: flex;
  flex-direction: column;

  list-style: none;
  z-index: 99;
  &:hover {
    cursor: pointer;
  }
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
