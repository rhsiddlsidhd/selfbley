import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SkillIcons } from "./SkillContent";
import {
  TechnologyKey,
  centerOffset,
  skillsKeys,
} from "../../constants/skillsConstants";
import { RollerItems } from "../molecules/RollerItems";
import RollingSkillIcons from "../molecules/RollingSkillIcons";

export type TechnologyOmitOverview = Exclude<TechnologyKey, "overview">;

const RollingSkills = ({ isSticky }: { isSticky: boolean }) => {
  const marqueeSkillsKeys: TechnologyKey[] = [...skillsKeys, ...skillsKeys];
  const underlineRef = useRef<HTMLParagraphElement[]>([]);
  // const [isHover, setIsHover] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<TechnologyOmitOverview | null>(null);
  const [filterIcons, setFilterIcons] = useState<SkillIcons[]>([]);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [underlineWidth, setUnderlindeWidth] = useState<number>(0);
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

  const handleHoverStart = () => {
    /**
     * hover 시
     * setInteval 일시 정지
     * 현재 어떤 스킬을 감지하였는지 여부
     *
     */
    const centerIndex = activeIndex + centerOffset;
    const id = marqueeSkillsKeys[centerIndex];
    if (id !== "overview") setIsHover(id);
    //밑줄
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
          opacity: isSticky ? 1 : 0,
        }}
        // 구조
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        <RollerItems
          activeIndex={activeIndex}
          underlineRef={underlineRef}
          underlineWidth={underlineWidth}
          marqueeSkillsKeys={marqueeSkillsKeys}
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
  height: 100%;
  &:hover {
    cursor: pointer;
  }
`;
