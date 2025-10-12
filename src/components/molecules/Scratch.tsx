import { useCallback, useState } from "react";
import useScreenStore, { Mode } from "../../stores/useScreenStore";
import styled from "styled-components";
import { MotionValue } from "motion";
import { useMotionValueEvent, useTransform } from "motion/react";
import ScratchChar from "../atoms/ScratchChar";
import { getScratchHighlightIndex } from "../../utils/calculation";

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

  const updateActiveIndex = useCallback(
    (latest: number) => {
      const highlightIndex = getScratchHighlightIndex(latest, text.length);

      setActiveIndex((prev) =>
        highlightIndex !== prev ? highlightIndex : prev
      );
    },
    [text.length]
  );

  useMotionValueEvent(scrollPercentage, "change", updateActiveIndex);

  return (
    <CharList $mode={mode}>
      {[...text].map((char, i) => {
        const color = i < activeIndex ? activeColor : inActiveColor;
        return <ScratchChar color={color} char={char} key={`${char}-${i}`} />;
      })}
    </CharList>
  );
};

export default Scratch;

const CharList = styled.div<{ $mode: Mode }>`
  width: ${({ $mode }) => ($mode !== "mobile" ? "calc(100% / 6 * 4)" : "90%")};
  white-space: pre-line;
  text-align: center;
  word-wrap: break-word;

  & > span {
    font-size: clamp(2rem, 5.12vw, 6.4rem);
    font-weight: bold;
  }
`;
