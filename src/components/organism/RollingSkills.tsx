import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SkillIcons } from "./SkillContent";
import { skillsKeys } from "../../constants/skillsConstants";
import { RollerItems } from "../molecules/RollerItems";
import RollingSkillIcons from "../molecules/RollingSkillIcons";

const RollingSkills = ({ isSticky }: { isSticky: boolean }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [filterIcons, setFilterIcons] = useState<SkillIcons[]>([]);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout>(null);
  useEffect(() => {
    if (isSticky) {
      startAutoPlay();
    }
    return () => {
      stopAutoPlay();
    };
  }, [isSticky]);

  useEffect(() => {
    if (activeIndex === skillsKeys.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(0);
      }, 600);

      setTimeout(() => {
        setIsTransitioning(true);
      }, 700);
    }
  }, [activeIndex]);

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
          opacity: isSticky ? 1 : 0,
        }}
        // 구조
      >
        <RollerItems
          activeIndex={activeIndex}
          setFilterIcons={setFilterIcons}
          setIsHover={setIsHover}
          startAutoPlay={startAutoPlay}
          stopAutoPlay={stopAutoPlay}
        />
      </Roller>
      {/* 롤러 스킬들의 아이콘  */}
      <RollingSkillIcons isHover={isHover} />
    </>
  );
};

export default RollingSkills;

const Roller = styled(motion.div)`
  flex: 1 0 auto;
  &:hover {
    cursor: pointer;
  }
`;
