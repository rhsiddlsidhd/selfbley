import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import tennis0 from "../../assets/tennis0.jpg";
import tennis1 from "../../assets/tennis1.jpg";
import tennis2 from "../../assets/tennis.2.jpg";
import useScreenStore, { Mode } from "../../stores/useScreenStore";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { QUESTIONS } from "../../constants/textConstants";

const InterView = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const mode = useScreenStore((state) => state.mode);
  const imgs = [`${tennis1}`, `${tennis2}`, `${tennis0}`];
  const containerRef = useRef(null);
  const { scrollYProgress: scrollYProgressStart } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: scrollYProgressEnd } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"],
  });
  const { scrollYProgress: total } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const fixedInY = useTransform(scrollYProgressStart, [0, 1], ["-50%", "0%"]);
  const fixedOutY = useTransform(scrollYProgressEnd, [0, 1], ["0%", "-50%"]);
  const cardTranslate = useTransform(total, [0, 1], ["200%", "-300%"]);
  const scale = useTransform(total, [0, 1], [1.1, 1]);

  useMotionValueEvent(total, "change", (latest) => {
    const newIndex = Math.min(
      Math.floor(latest * imgs.length),
      imgs.length - 1
    );

    setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
  });

  useEffect(() => {
    console.log(activeIndex);
  }, [activeIndex]);

  return (
    <Container ref={containerRef} $length={QUESTIONS.length}>
      <BackgroundWrapper>
        {QUESTIONS.map(({ src }, i, arr) => {
          const isFirst = i === 0;
          const isLast = i === arr.length - 1;
          return (
            <BackgroundImage
              style={{
                backgroundImage: `url(${src})`,
                y: isFirst ? fixedInY : isLast ? fixedOutY : 0,
                scale,
              }}
              animate={{
                opacity: activeIndex === i ? 1 : 0,
              }}
              transition={{ duration: 0.6 }}
              key={i}
            />
          );
        })}
      </BackgroundWrapper>
      {QUESTIONS.map((q, i) => {
        const { question, style } = q;
        return (
          <PostIts key={i}>
            <BackgroundBlur
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                x: mode !== "desktop" ? "50%" : "-50%",
                y: cardTranslate,
              }}
            />
            <PostIt $mode={mode} $top={style.top} $left={style.left}>
              {question}
            </PostIt>
          </PostIts>
        );
      })}
    </Container>
  );
};

export default InterView;
const Container = styled(motion.section)<{ $length: number }>`
  height: ${({ $length }) => `${$length * 100}vh`};
`;

const PostIts = styled(motion.section)`
  height: 100vh;
  min-height: fit-content;
  position: relative;
`;

const PostIt = styled.h6<{ $mode: Mode; $top: number; $left: number }>`
  position: absolute;
  display: flex;
  top: ${({ $top }) => `${$top}%`};
  left: ${({ $mode, $left }) =>
    $mode !== "desktop" ? `calc(100% / 6 * 1)` : `calc(100% / 6 * ${$left})`};
  width: ${({ $mode }) =>
    $mode === "desktop" ? `calc(100% / 6 * 2)` : `calc(100% / 6 * 4)`};
  word-break: keep-all;
  font-weight: bold;
  padding: 3rem;
  backdrop-filter: blur(10px);
`;

const BackgroundBlur = styled(motion.div)`
  width: calc(100% / 6 * 2);
  aspect-ratio: 1 / 1;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  z-index: -1;
`;

const BackgroundWrapper = styled(motion.div)`
  position: sticky;
  top: 0;
  z-index: -1;
`;

const BackgroundImage = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: absolute;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  filter: grayscale(80%) brightness(60%);
`;
