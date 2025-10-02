import { useScroll } from "motion/react";
import { useRef } from "react";
import styled from "styled-components";
import Scratch from "../molecules/Scratch";

const ScratchSection = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "start start"],
  });

  /**
   * 스크롤의 높이에 따라 일괄적으로 글 전체가 컬러가 동시에 바뀜
   * 수정안
   * text 의 길이를 스크롤 비율에 맞춰서 글자 하나하나 컬러가 바뀌도록 수정
   * 1.스크롤이 가능한 길이의 값을 구한다.
   * 2. 스크롤 비율만큼 텍스트의 비율 또한 색깔을 변경한다.
   */

  return (
    <Container ref={containerRef}>
      <Scratch
        text={text}
        scrollYProgress={scrollYProgress}
        activeColor="rgba(250, 247, 247, 0.973)"
        inActiveColor="rgb(255, 140, 108)"
      />
    </Container>
  );
};

export default ScratchSection;

const Container = styled.section`
  position: relative;
  height: 50vh;
  min-height: fit-content;
  background-color: #ff6a41;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
`;
