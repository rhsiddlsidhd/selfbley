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

const Skills = () => {
  const containerRef = useRef(null);
  const bgImgs = [books, structure, deep, dark];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFixed, setIsFixed] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const maxOffset = (bgImgs.length - 1) * 100;
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -maxOffset]);
  const x = useMotionTemplate`${rawX}vw`;
  const isScrollRange = (n: number) => n > 0 && n < 1;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsFixed(isScrollRange(latest));

    const newIndex = Math.min(
      Math.floor(latest * bgImgs.length),
      bgImgs.length - 1
    );
    setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
  });

  return (
    <Container ref={containerRef} $bgImgs={bgImgs.length}>
      <BackgroundWrapper
        isFixed={isFixed}
        style={{
          y: !isFixed && activeIndex === bgImgs.length - 1 ? "300%" : 0,
        }}
      >
        {bgImgs.map((source, i) => {
          return (
            <Background
              key={i}
              source={source}
              animate={{ opacity: i === activeIndex ? 1 : 0 }}
            />
          );
        })}
      </BackgroundWrapper>
      <StickyArea>
        <HorizontalWrapper style={{ x }} $bgImgs={bgImgs.length}>
          <Content></Content>

          {/* {sections.map((v, i) => (
            <Content key={i}>{v}</Content>
          ))} */}
        </HorizontalWrapper>
      </StickyArea>
    </Container>
  );
};

export default Skills;

const BackgroundWrapper = styled(motion.div)<{ isFixed: boolean }>`
  position: ${({ isFixed }) => (isFixed ? "fixed" : "absolute")};
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Background = styled(motion.div)<{ source: string }>`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-image: url(${({ source }) => source});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;

  filter: blur(5px);
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

const HorizontalWrapper = styled(motion.div)<{ $bgImgs: number }>`
  display: flex;
  width: ${({ $bgImgs }) => $bgImgs * 100}vw;
  align-items: center;
  height: 100vh;
`;

const Content = styled.div`
  width: 380vw;
  height: 50vh;
  border: 1px solid red;
`;
