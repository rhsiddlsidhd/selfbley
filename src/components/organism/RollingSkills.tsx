import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import {
  TechnologyKey,
  centerOffset,
  technology,
} from "../../constants/skillsConstants";
import { RollerItems } from "../molecules/RollerItems";
import RollingSkillIcons from "../molecules/RollingSkillIcons";

const RollingSkills = () => {
  const category = Object.keys(technology) as TechnologyKey[];
  const marqueeSkillsKeys: TechnologyKey[] = [...category, ...category];
  const underlineRef = useRef<HTMLParagraphElement[]>([]);
  const [isHover, setIsHover] = useState<TechnologyKey | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [underlineWidth, setUnderlindeWidth] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  const centerIndex = activeIndex + centerOffset;
  useEffect(() => {
    startAutoPlay();
    return () => {
      stopAutoPlay();
    };
  }, []);

  useEffect(() => {
    if (activeIndex === category.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(0);
      }, 600);

      setTimeout(() => {
        setIsTransitioning(true);
      }, 700);
    }
  }, [activeIndex, category.length]);

  const startAutoPlay = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleHoverStart = () => {
    const id = marqueeSkillsKeys[centerIndex];
    setIsHover(id);
    const width = underlineRef.current[centerIndex].offsetWidth;
    setUnderlindeWidth(width);
    stopAutoPlay();
  };

  const handleHoverEnd = () => {
    startAutoPlay();
    if (isHover !== null) {
      setIsHover(null);
    }
    setUnderlindeWidth(0);
  };

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
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        <RollerItems
          centerIndex={centerIndex}
          underlineRef={underlineRef}
          underlineWidth={underlineWidth}
          marqueeSkillsKeys={marqueeSkillsKeys}
        />
      </Roller>
      <RollingSkillIcons isHover={isHover} />
    </>
  );
};

export default RollingSkills;

const Roller = styled(motion.div)`
  height: 100%;
  &:hover {
    cursor: pointer;
  }
`;
