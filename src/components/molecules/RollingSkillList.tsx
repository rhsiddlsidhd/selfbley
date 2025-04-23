import { motion } from "motion/react";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { css, styled } from "styled-components";
import {
  TechnologyKey,
  centerOffset,
  technology,
} from "../../constants/skillsConstants";
import { SkillIcons } from "../organism/SkillContent";
import RollerItem from "../atoms/RollerItem";

interface RollingSkillListProps {
  setFilterIcons: React.Dispatch<SetStateAction<SkillIcons[]>>;
  setIsHover: React.Dispatch<SetStateAction<boolean>>;
  isSticky: boolean;
}

const RollingSkillList = ({
  setFilterIcons,
  setIsHover,

  isSticky,
}: RollingSkillListProps) => {
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const skillsKeys: TechnologyKey[] = [
    "language",
    "frontend",
    "backend",
    "etc",
  ];
  const marqueeSkillsKeys = [...skillsKeys, ...skillsKeys];

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
  }, [activeIndex, skillsKeys.length]);

  const startAutoPlay = () => {
    if (intervalRef.current) return; // 이미 실행 중이면 무시
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
    <Roller
      transition={
        isTransitioning ? { duration: 0.6, ease: "easeInOut" } : { duration: 0 }
      }
      animate={{ y: `-${activeIndex * (100 / 3)}%`, opacity: isSticky ? 1 : 0 }}
    >
      {/* 마키와 같은 원리   */}
      {/* active 아이템을 center에 위치시키기 위한 방법 */}

      {marqueeSkillsKeys.map((skill, i, arr) => {
        const centerIndex = activeIndex + centerOffset;
        const id = arr[centerIndex];

        return (
          <RollerItem
            centerIndex={centerIndex}
            id={id}
            idx={i}
            setFilterIcons={setFilterIcons}
            setIsHover={setIsHover}
            skill={skill}
            startAutoPlay={startAutoPlay}
            stopAutoPlay={stopAutoPlay}
            key={`${skill}-${i}`}
          />
        );
      })}
    </Roller>
  );
};

export default RollingSkillList;

const Roller = styled(motion.div)`
  flex: 1 0 auto;

  &:hover {
    cursor: pointer;
  }
`;
