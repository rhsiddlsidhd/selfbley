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

  const CARD_TOTAL_WIDTH = 95;
  const CARD_GAP = 15;
  const CARD_WIDTH = 80;
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

  const maxOffset = (bgImgs.length - 1) * CARD_TOTAL_WIDTH; //100

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

    const offsetX = latest * maxOffset;
    const newIndex = Math.min(
      Math.round(offsetX / CARD_TOTAL_WIDTH),

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
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
          reprehenderit aspernatur magnam tempora. Vero praesentium in deleniti
          repellendus. Ut eaque, libero minima sunt molestiae temporibus itaque
          esse nostrum quos possimus.
        </div>
        <HorizontalWrapper style={{ x }} $bgImgs={bgImgs.length}>
          {/* style={{ x }} */}
          {sections.map((v) => {
            return (
              <CardSlot>
                <Card>{v}</Card>
              </CardSlot>
            );
          })}
        </HorizontalWrapper>
      </StickyArea>
    </Container>
  );
};

export default Skills;

const CardSlot = styled.div`
  width: 80vw;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  border: 1px solid red;
`;

const Card = styled.div`
  min-width: 350px;
  max-width: calc(100vw / 6 * 4);
  aspect-ratio: 3 / 4;
  background-color: green;
`;

const Background = styled(motion.div)<{ source: string; isFixed: boolean }>`
  position: ${({ isFixed }) => (isFixed ? "fixed" : "absolute")};
  top: 0;
  width: 100%;
  height: 100vh;
  background-image: url(${({ source }) => source});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  filter: blur(5px);
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > div:first-child {
    max-width: 350px;
    margin: 6rem 0;
  }
  overflow: hidden;
`;

const HorizontalWrapper = styled(motion.div)<{ $bgImgs: number }>`
  width: ${({ $bgImgs }) => $bgImgs * 100}vw;
  height: 50vh;
  background-color: #000000b0;
  display: flex;
  gap: 15vw;
`;

//background 의 setInAcitive 또한 카드의 넓이만큼 이동했을때 변해야한다 .
// 한 화면에 카드를 두장씩 보여주기 위해선 하나의 카드가 100vw 만큼의 넓이를 가져가면 볼 수 없다.
// 하나의 카드가 80vw + gap 15vw 라면 5vw 만큼 다음카드가 보일거고
// background 또한 95vw 만큼 이동시에 바껴야한다.
