import { motion } from "motion/react";

import styled from "styled-components";

import RollingSkillIcons from "../../../molecules/RollingSkillIcons";
import { TechnologyKeys, technologys } from "./constant";
import useSlot from "../../../../hooks/useSlot";

const TechnologiesContent = () => {
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
    <>
      <Roller
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
            <Item
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
            </Item>
          );
        })}
      </Roller>
      <RollingSkillIcons isHover={isHover} />
    </>
  );
};

export default TechnologiesContent;
const Underline = styled(motion.div)`
  position: absolute;
  bottom: -0.5rem;
  border: 2px solid white;
  transform-origin: left;
  width: 100%;
`;
const Item = styled(motion.li)`
  flex: 3 0 calc(100% / 3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Roller = styled(motion.ul)`
  height: 100%;
  display: flex;
  flex-direction: column;
  list-style: none;
  z-index: 99;
  &:hover {
    cursor: pointer;
  }
`;
