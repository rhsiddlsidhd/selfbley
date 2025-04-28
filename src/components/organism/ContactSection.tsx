import { useScroll } from "motion/react";
import { useRef } from "react";
import { styled } from "styled-components";
import Scratch from "../molecules/Scratch";
import Footer from "../../layout/Footer";
import VerticalLine from "../atoms/VerticalLine";

import FooterLogo from "./FooterLogo";

const ContactSection: React.FC = () => {
  const scratchRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scratchRef,
    offset: ["start start", "center start"],
  });

  return (
    <Container>
      <VerticalLine page="MAIN" />
      <ScratchContainer ref={scratchRef}>
        <Scratch
          scrollYProgress={scrollYProgress}
          text="빠르게 변화하는 프론트엔드 기술 개발에 트렌드를 읽고 유연하게 받아 들여 성장을 지향합니다.  "
          activeColor="#FFFFFF"
          inActiveColor="#383535"
        />
      </ScratchContainer>
      <h1 style={{ margin: "6rem 0" }}>Contact Us</h1>
      <Footer />
      <FooterLogo />
    </Container>
  );
};

export default ContactSection;

const Container = styled.section`
  position: relative;
  min-height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScratchContainer = styled.div`
  padding: 6rem 0;
  height: 50vh;
  min-height: fit-content;
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: center;
`;
