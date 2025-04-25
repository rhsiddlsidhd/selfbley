import React, { useState } from "react";
import useScreenStore, { Mode } from "../../stores/useScreenStore";
import styled from "styled-components";
import { MotionValue } from "motion";
import { useMotionValueEvent, useTransform } from "motion/react";
import ScratchChar from "../atoms/ScratchChar";

const Scratch = ({
  text,
  scrollYProgress,
  activeColor,
  inActiveColor,
}: {
  text: string;
  scrollYProgress: MotionValue<number>;
  activeColor: string;
  inActiveColor: string;
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const mode = useScreenStore((state) => state.mode);
  const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const updateActiveIndex = (latest: number) => {
    const highlightIndex = Math.round(
      (Number(latest.toFixed()) / 100) * text.length
    );
    if (highlightIndex !== activeIndex) {
      setActiveIndex(highlightIndex);
    }
  };
  useMotionValueEvent(scrollPercentage, "change", updateActiveIndex);
  return (
    <CharList $mode={mode}>
      {[...text].map((char, i) => {
        const color = i < activeIndex ? activeColor : inActiveColor;
        return <ScratchChar color={color} char={char} key={i} />;
      })}
    </CharList>
  );
};

export default Scratch;

const CharList = styled.div<{ $mode: Mode }>`
  width: ${({ $mode }) => ($mode !== "mobile" ? "calc(100% / 6 * 4)" : "90%")};
  display: flex;
  flex-wrap: wrap;
  & > span {
    font-size: clamp(1.92rem, 5.12vw, 6.4rem);
    font-weight: bold;
  }
`;
