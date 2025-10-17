import { useCallback, useState } from "react";
import styled from "styled-components";
import { MotionValue } from "motion";
import { useMotionValueEvent, useTransform } from "motion/react";
import useScreenStore, { Mode } from "../../../stores/screenStore";

const getScratchActiveIndex = (latest: number, textLength: number) => {
  const activeIndex = Math.floor((Math.round(latest) / 100) * textLength);

  return activeIndex;
};

const ScratchChar = ({ char, color }: { char: string; color: string }) => {
  return <span style={{ color }}>{char === " " ? "\u00A0" : char}</span>;
};

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
      const scratchActiveIndex = getScratchActiveIndex(latest, text.length);

      setActiveIndex((prev) =>
        scratchActiveIndex !== prev ? scratchActiveIndex : prev
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
  ${({ theme, $mode }) =>
    $mode !== "mobile" ? theme.responseWidth(4) : theme.responseWidth(5)};
  white-space: pre-line;
  text-align: center;
  word-wrap: break-word;

  & > span {
    font-size: ${({ theme }) => theme.FONT_SIZE.clamp3};
    font-weight: bold;
  }
`;
