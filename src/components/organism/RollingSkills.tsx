import { motion } from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import {
  TechnologyKey,
  btnText,
  centerOffset,
  skillsKeys,
} from "../../constants/skillsConstants";
import { RollerItems } from "../molecules/RollerItems";
import RollingSkillIcons from "../molecules/RollingSkillIcons";
import SKillModalBtn from "./SKillModalBtn";

export type TechnologyOmitOverview = Exclude<TechnologyKey, "overview">;

const RollingSkills = ({ isSticky }: { isSticky: boolean }) => {
  const marqueeSkillsKeys: TechnologyKey[] = [...skillsKeys, ...skillsKeys];
  const underlineRef = useRef<HTMLParagraphElement[]>([]);
  const [isHover, setIsHover] = useState<TechnologyOmitOverview | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [underlineWidth, setUnderlindeWidth] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const [isModal, setIsModal] = useState<boolean>(false);
  const centerIndex = activeIndex + centerOffset;
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
    const id = marqueeSkillsKeys[centerIndex];
    if (id !== "overview") setIsHover(id);
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
  const openModal = useCallback(() => setIsModal(true), []);

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
          centerIndex={centerIndex}
          underlineRef={underlineRef}
          underlineWidth={underlineWidth}
          marqueeSkillsKeys={marqueeSkillsKeys}
        />
      </Roller>
      {/* 롤러 스킬들의 아이콘  */}
      <SKillModalBtn isSticky={isSticky} isModal={openModal} />
      <SKillModal animate={{ y: isModal ? "0" : "100%" }}>
        <button onClick={() => setIsModal(false)}></button>
      </SKillModal>
      <RollingSkillIcons isHover={isHover} />
    </>
  );
};

export default RollingSkills;

const SKillModal = styled(motion.div)`
  width: 100%;
  height: 100vh;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  & > button {
    width: 50%;
    height: 50%;
  }
`;

const Roller = styled(motion.div)`
  flex: 1 0 auto;
  height: 100%;
  &:hover {
    cursor: pointer;
  }
`;
