import { useRef } from "react";
import styled from "styled-components";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

import books from "../assets/books.jpg";
import deep from "../assets/deep.jpg";
import structure from "../assets/structure1.jpg";
import dark from "../assets/dark.jpg";

const sections = ["Section 1", "Section 2", "Section 3", "Section 4"];

const TheSkills = () => {
  const containerRef = useRef(null);
  const bgImgs = [books, structure, deep, dark];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const maxOffset = (bgImgs.length - 1) * 100;
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -maxOffset]);
  const x = useMotionTemplate`${rawX}vw`;

  return (
    <Container ref={containerRef} $bgImgs={bgImgs.length}>
      <StickyArea>
        <HorizontalWrapper style={{ x }} $bgImgs={bgImgs.length}>
          {sections.map((v, i) => (
            <Content key={i}>{v}</Content>
          ))}
        </HorizontalWrapper>
      </StickyArea>
    </Container>
  );
};

export default TheSkills;
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
`;

const Content = styled.div`
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f1f1;
  font-size: 2rem;
  font-weight: bold;
`;
