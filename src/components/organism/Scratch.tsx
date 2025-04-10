import { useRef, useState } from "react";
import styled from "styled-components";
import useScreenStore, { Mode } from "../../stores/useScreenStore";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

const Scratch = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const mode = useScreenStore((state) => state.mode);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "start start"],
  });

  const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);

  /**
   * 스크롤의 높이에 따라 일괄적으로 글 전체가 컬러가 동시에 바뀜
   * 수정안
   * text 의 길이를 스크롤 비율에 맞춰서 글자 하나하나 컬러가 바뀌도록 수정
   *
   * 1.스크롤이 가능한 길이의 값을 구한다.
   * 2. 스크롤 비율만큼 텍스트의 비율 또한 색깔을 변경한다.
   */

  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta repellat quam nisi eligendi, quia facilis repudiandae saepe nobis possimus, quibusdam ab quaerat.";
  const textLength = text.length;

  const updateActiveIndex = (latest: number) => {
    const highlightIndex = Math.round(
      (Number(latest.toFixed()) / 100) * textLength
    );
    setActiveIndex(highlightIndex);
  };

  useMotionValueEvent(scrollPercentage, "change", updateActiveIndex);

  return (
    <Container ref={containerRef}>
      <Wrapper $mode={mode}>
        {[...text].map((word, i) => {
          const color =
            i < activeIndex ? "rgba(250, 247, 247, 0.973)" : "#FF8C6C";
          return (
            <motion.span
              style={{ color }}
              transition={{ type: "spring", duration: 1 }}
              key={i}
            >
              {word === " " ? "\u00A0" : word}
            </motion.span>
          );
        })}
      </Wrapper>
    </Container>
  );
};

export default Scratch;

const Container = styled.section`
  position: relative;
  height: 75vh;
  min-height: min-content;
  background-color: #ff6a41;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Wrapper = styled.div<{ $mode: Mode }>`
  width: ${({ $mode }) => ($mode !== "mobile" ? "calc(100%/6*4)" : "100%")};
  display: flex;
  flex-wrap: wrap;
  & > span {
    font-size: clamp(1.92rem, 5.12vw, 6.4rem);
    font-weight: bold;
  }
`;
