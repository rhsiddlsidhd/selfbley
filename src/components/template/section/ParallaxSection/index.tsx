import { useRef, useState } from "react";
import styled from "styled-components";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { FAQList, QUESTIONS } from "../../../../constants/textConstants";

import SignSVGContainer from "../../../organism/SignSVGContainer";
import ParallaxImages from "../../../molecules/ParallaxImages";
import Memo from "../../../atoms/Memo";

const ParallaxSection = () => {
  const questionsLength = QUESTIONS.length;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: total } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const y = useTransform(
    total,
    [0, 0.25, 0.75, 1],
    ["-50%", "0%", "0%", "50%"]
  );

  useMotionValueEvent(total, "change", (latest) => {
    const newIndex = Math.min(
      Math.floor(latest * questionsLength),
      questionsLength - 1
    );
    setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
  });

  const memoConfig = [
    {
      top: 20,
      left: 1,
    },
    {
      top: 20,
      left: 3,
    },
    { top: 0, left: 1 },
  ];

  return (
    <Container ref={containerRef}>
      <SignSVGContainer
        isView={true}
        section="parallaxSection"
        $position="absolute"
      />
      <ParallaxImages activeIndex={activeIndex} y={y} />

      {FAQList.map(({ question, answer }, i) => {
        return (
          <MemoContainer key={i}>
            <Memo
              style={{
                pointerEvents: clickedIndex !== i ? "auto" : "none",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: clickedIndex !== i ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setClickedIndex(i)}
              onMouseLeave={() => setClickedIndex(null)}
              $left={memoConfig[i].left}
              $top={memoConfig[i].top}
            >
              ❓질문 {i + 1} : {question}
            </Memo>
            <Memo
              initial={{ opacity: 0 }}
              animate={{ opacity: clickedIndex === i ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setClickedIndex(i)}
              onMouseLeave={() => setClickedIndex(null)}
              $left={memoConfig[i].left}
              $top={memoConfig[i].top}
              style={{
                pointerEvents: clickedIndex === i ? "auto" : "none",
              }}
            >
              💬 {answer}
            </Memo>
          </MemoContainer>
        );
      })}
    </Container>
  );
};

export default ParallaxSection;

const Container = styled.section`
  position: relative;
`;

const MemoContainer = styled.section`
  position: relative;
  height: 100vh;
`;

/**
 *               {clickedIndex === i
                ? `💬 ${answer}`
                : `❓질문 ${i + 1} : ${question}`}
 */
