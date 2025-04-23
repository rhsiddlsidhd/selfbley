import { motion } from "motion/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { styled } from "styled-components";
import { technology } from "../../constants/skillsConstants";

import useScreenStore from "../../stores/useScreenStore";

import { RollerItems } from "../molecules/RollerItems";
interface SkillContentProps {
  isSticky: boolean;
}

export interface SkillIcons {
  name: string;
  icon: string;
}

const SkillContent = ({ isSticky }: SkillContentProps) => {
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const mode = useScreenStore((state) => state.mode);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [filterIcons, setFilterIcons] = useState<SkillIcons[]>([]);
  const TOTAL_COLUMNS = 6;
  const ACTIVE_COLUMENS = 4;

  const skillsKeys = useMemo(
    () => Object.keys(technology).filter((key) => key !== "overview"),
    [technology]
  );

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
    <ContentWrapper
      animate={{
        width: isSticky
          ? `calc(100% / ${TOTAL_COLUMNS} *  ${ACTIVE_COLUMENS})`
          : "100%", //mobile 에서는 4개 그외 2개

        height: isSticky ? "50%" : "100%",
      }}
    >
      <Ovewview
        animate={{
          display: isSticky ? "none" : "block",
          opacity: isSticky ? 0 : 1,
        }}
      >
        <p>{technology["overview"].description}</p>
      </Ovewview>
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
      <IconsBoxContainer>
        <IconWrapper
          initial={{ y: "100%" }}
          animate={{ y: isHover ? "0" : "100%" }}
        >
          {filterIcons.map(({ icon }, i) => {
            return (
              <div key={i}>
                <img src={icon} alt="아이콘" />
              </div>
            );
          })}
        </IconWrapper>
      </IconsBoxContainer>
    </ContentWrapper>
  );
};

export default SkillContent;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Ovewview = styled(motion.div)``;

const Roller = styled(motion.div)`
  flex: 1 0 auto;
  &:hover {
    cursor: pointer;
  }
`;

const IconsBoxContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: -1;
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  justify-content: end;
  gap: 1rem;
  flex-wrap: wrap;
  width: calc(5rem * 5 + 1rem * 4);
  border-top-left-radius: 10px;

  & > div {
    flex: 0 0 5rem; // mobile 3  gap 0.5  else 5 gap 1
    aspect-ratio: 1 / 1;
    background-color: white;
    border-radius: 10px;
    padding: 0.5rem;

    & > img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
`;
