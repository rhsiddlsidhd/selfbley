import { useEffect, useRef, useState } from "react";
import {
  TechnologyKeys,
  technologys,
} from "../components/organism/content/TechnologiesContent/constant";
import { centerOffset } from "../constants/skillsConstants";

const techCategory = Object.keys(technologys) as TechnologyKeys[];
const clone = [...techCategory, ...techCategory];

const useSlot = () => {
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const [isHover, setIsHover] = useState<TechnologyKeys | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const centerIndex = activeIndex + centerOffset;

  useEffect(() => {
    startAutoPlay();
    return () => {
      stopAutoPlay();
    };
  }, []);

  useEffect(() => {
    if (activeIndex === techCategory.length) {
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
    const id = clone[centerIndex];

    setIsHover(id);
    stopAutoPlay();
  };

  const handleHoverEnd = () => {
    startAutoPlay();
    if (isHover !== null) {
      setIsHover(null);
    }
  };

  return {
    activeIndex,
    isHover,
    isTransitioning,
    handleHoverEnd,
    handleHoverStart,
    centerIndex,
  };
};

export default useSlot;
