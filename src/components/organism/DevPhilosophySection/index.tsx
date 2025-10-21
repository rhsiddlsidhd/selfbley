import styled from "styled-components";
import Marquee from "../../molecules/Marquee/index";
import { useRef } from "react";
import { useScroll } from "motion/react";
import Scratch from "../../molecules/Scratch/index";
import Sign from "../../atoms/Sign";
import SVGContainer from "../../template/container/SVGContainer";

const text = ["사용자를 생각하며", "비즈니스 가치를 고민하는", "개발자"].join(
  "\n"
);

const title = "The DevPhilosophy";

const DevPhilosophySection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "start start"],
  });
  return (
    <Container ref={containerRef}>
      <SVGContainer
        isInView={true}
        $width={2}
        style={{ top: "25%", left: "0" }}
      >
        <Sign type={1} />
      </SVGContainer>

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
  background-color: ${({ theme }) => theme.COLORS.black};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow: hidden;
`;

const ScratchContainer = styled.div`
  height: 100%;
  width: 100%;
  ${({ theme }) => theme.FLEX_CENTER}
`;
