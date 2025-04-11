import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
} from "framer-motion";

import books from "../../assets/books.jpg";
import deep from "../../assets/deep.jpg";
import structure from "../../assets/structure3.jpg";
import dark from "../../assets/dark.jpg";

const sections = ["Section 1", "Section 2", "Section 3", "Section 4"];
type ScrollPhase = "initial" | "mid" | "last";

const Skills = () => {
  /**
   * first bg img
   * transform -50% => 0%
   */

  const containerRef = useRef(null);
  const bgImgs = [books, structure, deep, dark];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const { scrollYProgress: initial } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: mid } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: last } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"],
  });

  const maxOffset = (bgImgs.length - 1) * 100;
  const rawX = useTransform(mid, [0, 1], [0, -maxOffset]);
  const initialY = useTransform(initial, [0, 1], [-50, 0]);
  const lastY = useTransform(last, [0, 1], [300, 400]);
  const x = useMotionTemplate`${rawX}vw`;
  const initialTranslateY = useMotionTemplate`${initialY}%`;
  const lastTranslateY = useMotionTemplate`${lastY}%`;

  const isScrollRange = (n: number) => n > 0 && n < 1;
  const getScrollPhase = (index: number, length: number): ScrollPhase => {
    return index === 0 ? "initial" : index === length - 1 ? "last" : "mid";
  };

  const getTranslateYByStep = (step: ScrollPhase) => {
    if (step === "initial" && !isFixed) return initialTranslateY;
    if (step === "last" && !isFixed) return lastTranslateY;
    return "0%";
  };
  useMotionValueEvent(mid, "change", (latest) => {
    setIsFixed(isScrollRange(latest));
    const newIndex = Math.min(
      Math.floor(latest * bgImgs.length),
      bgImgs.length - 1
    );
    setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
  });

  return (
    <Container ref={containerRef} $bgImgs={bgImgs.length}>
      {bgImgs.map((source, i, arr) => {
        const step = getScrollPhase(i, arr.length);
        const y = getTranslateYByStep(step);
        return (
          <Background
            key={i}
            source={source}
            isFixed={isFixed}
            animate={{
              opacity: i === activeIndex ? 1 : 0,
            }}
            style={{ y }}
            initial={false}
          />
        );
      })}
      <StickyArea>
        <Title>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Title>
        <HorizontalWrapper $bgImgs={bgImgs.length}>
          <CardSlider $cardCount={sections.length} style={{ x }}>
            {sections.map((v, i) => (
              <Card key={i}>{v}</Card>
            ))}
          </CardSlider>
        </HorizontalWrapper>
      </StickyArea>
    </Container>
  );
};

export default Skills;

const Background = styled(motion.div)<{ source: string; isFixed: boolean }>`
  position: ${({ isFixed }) => (isFixed ? "fixed" : "absolute")};
  top: 0;
  width: 100%;
  height: 100vh;
  background-image: url(${({ source }) => source});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;

  z-index: -1;
`;

const Container = styled.section<{ $bgImgs: number }>`
  height: ${({ $bgImgs }) => $bgImgs * 100}vh;
  width: 100%;
  position: relative;
`;

const StickyArea = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const Title = styled.div`
  height: 20vh;
`;

const HorizontalWrapper = styled(motion.div)<{ $bgImgs: number }>`
  width: ${({ $bgImgs }) => $bgImgs * 100}vw;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  /* background-color: green; */
`;

const CardSlider = styled(motion.div)<{ $cardCount: number }>`
  border: 1px solid red;
  width: 380vw;
  height: 50%;
  display: flex;
  justify-content: space-between;
`;

const Card = styled.div``;
