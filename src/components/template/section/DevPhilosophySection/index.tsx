import styled from "styled-components";
import Marquee from "../../../molecules/Marquee";
import Scratch from "../../../molecules/Scratch";
import { useRef } from "react";
import { useScroll } from "motion/react";

const text = [
  "사용자를 생각하며",
  "비즈니스적인 가치를 고민하는",
  "개발자",
].join("\n");

const title = "The DevPhilosophy";

const DevPhilosophySection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "start start"],
  });
  return (
    <Container ref={containerRef}>
      <Marquee text={title.toUpperCase()} reverse={true} />
      <ScratchContainer>
        <Scratch
          text={text}
          scrollYProgress={scrollYProgress}
          activeColor="white"
          inActiveColor="black"
        />
      </ScratchContainer>
    </Container>
  );
};

export default DevPhilosophySection;

const Container = styled.section`
  position: relative;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow: hidden;
`;

const ScratchContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
