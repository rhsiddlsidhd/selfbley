import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import React, { useRef } from "react";
import styled from "styled-components";

const TheSkills = () => {
  const colors = ["blue", "green", "yellow", "pink"];
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Container ref={scrollRef}>
      <motion.hr
        style={{
          width,
          backgroundColor: "red",
          height: "3rem",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      ></motion.hr>
      <div style={{ position: "absolute" }}>
        {colors.map((v, i) => {
          return (
            <Wrapper $colors={v} key={i} className={`item_${i}`}>
              {i}
            </Wrapper>
          );
        })}
      </div>
    </Container>
  );
};

export default TheSkills;
const Container = styled.section`
  height: 200vh;
  background-color: transparent;
  position: relative;
  .item_0 {
    /* opacity: 0; */
    /* display: none; */
  }
  .item_1 {
    /* opacity: 0; */
    /* display: none; */
  }
  .item_2 {
    /* opacity: 0; */
    /* display: none; */
  }
  .item_3 {
    /* opacity: 0; */
    /* display: none; */
  }
`;

const Wrapper = styled(motion.div)<{ $colors: string }>`
  height: 100vh;
  /* position: relative; */
  /* transform: translate(0%, 50%); */
  background-color: ${({ $colors }) => $colors};
`;

const ColorBoxs = styled.div<{ $colors: string }>`
  background-color: ${({ $colors }) => $colors};
  width: 100%;
  height: 100%;
  position: absolute;
`;
