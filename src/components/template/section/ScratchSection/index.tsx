import { useScroll } from "motion/react";
import { useRef } from "react";
import styled from "styled-components";
import Scratch from "../../../molecules/Scratch";

interface ScratchSectionProps {
  text: string;
  bgColor?: string;
  activeColor?: string;
  inActiveColor?: string;
}

const ScratchSection = ({
  text,
  bgColor = "#ff6a41",
  activeColor = "#faf7f7f8",
  // inActiveColor = "#ff8c6c",
  inActiveColor = "#ff6a41",
}: ScratchSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  /**
   * 스크롤의 높이에 따라 일괄적으로 글 전체가 컬러가 동시에 바뀜
   * 수정안
   * text 의 길이를 스크롤 비율에 맞춰서 글자 하나하나 컬러가 바뀌도록 수정
   * 1.스크롤이 가능한 길이의 값을 구한다.
   * 2. 스크롤 비율만큼 텍스트의 비율 또한 색깔을 변경한다.
   */

  return (
    <Container ref={containerRef} style={{ backgroundColor: bgColor }}>
      <Scratch
        text={text}
        scrollYProgress={scrollYProgress}
        activeColor={activeColor}
        inActiveColor={inActiveColor}
      />
    </Container>
  );
};

export default ScratchSection;

const Container = styled.section`
  position: relative;
  height: 100vh;
  min-height: fit-content;
  z-index: 7;
  display: flex;
  align-items: center;
  justify-content: center;
`;
