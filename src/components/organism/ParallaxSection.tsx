import { useMemo, useRef, useState } from "react";
import styled from "styled-components";

import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { QUESTIONS } from "../../constants/textConstants";
import ParallaxBackground from "../molecules/ParallaxBackground";
import PostIts from "../molecules/PostIts";
import { getParallaxActiveIndex } from "../../utils/calculation";
import SignSVGContainer from "./SignSVGContainer";

const ParallaxSection = () => {
  const questionsLength = QUESTIONS.length;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: total } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: scrollYProgressStart } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const { scrollYProgress: scrollYProgressEnd } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"],
  });
  const blurTranslate = useTransform(total, [0, 1], ["200%", "-300%"]);

  useMotionValueEvent(total, "change", (latest) => {
    const newIndex = getParallaxActiveIndex(latest, questionsLength);
    setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
  });

  const questionsOnlySrc = useMemo(() => {
    return QUESTIONS.map(({ src }) => src);
  }, []);

  const questionsOmitSrc = useMemo(() => {
    return QUESTIONS.map(({ src, ...rest }) => rest);
  }, []);

  return (
    <Container ref={containerRef}>
      <SignSVGContainer
        isView={true}
        section="parallaxSection"
        $position="absolute"
      />
      <ParallaxBackground
        activeIndex={activeIndex}
        scrollYProgressStart={scrollYProgressStart}
        scrollYProgressEnd={scrollYProgressEnd}
        imgs={questionsOnlySrc}
      />
      <PostIts blurTranslate={blurTranslate} questions={questionsOmitSrc} />
    </Container>
  );
};

export default ParallaxSection;

const Container = styled.section`
  position: relative;
  height: fit-content;
  background-color: black;
`;
