import { useRef, useState } from "react";
import styled from "styled-components";

import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { QUESTIONS } from "../../../../constants/textConstants";
import { getParallaxActiveIndex } from "../../../../utils/calculation";
import PostIts from "../../../molecules/PostIts";
import ParallaxBackground from "../../../organism/background/ParallaxBackground";

const ParallaxSection = () => {
  const questionsLength = QUESTIONS.length;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: total } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const blurTranslate = useTransform(total, [0, 1], ["200%", "-300%"]);

  useMotionValueEvent(total, "change", (latest) => {
    const newIndex = getParallaxActiveIndex(latest, questionsLength);
    setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
  });

  return (
    <Container ref={containerRef}>
      <ParallaxBackground activeIndex={activeIndex} />
      <PostIts blurTranslate={blurTranslate} />
    </Container>
  );
};

export default ParallaxSection;

const Container = styled.section`
  position: relative;
  height: fit-content;
  background-color: black;
`;
