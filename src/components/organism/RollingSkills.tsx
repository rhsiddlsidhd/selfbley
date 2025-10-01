import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  TechnologyKey,
  centerOffset,
  technology,
} from "../../constants/skillsConstants";
import RollingSkillIcons from "../molecules/RollingSkillIcons";

const RollingSkills = () => {
  const category = Object.keys(technology) as TechnologyKey[];
  const marqueeSkillsKeys: TechnologyKey[] = [...category, ...category];

  const [isHover, setIsHover] = useState<TechnologyKey | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);

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
    stopAutoPlay();
  };

  const handleHoverEnd = () => {
    startAutoPlay();
    if (isHover !== null) {
      setIsHover(null);
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

export default RollingSkills;
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
