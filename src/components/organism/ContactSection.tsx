import { useScroll } from "motion/react";
import { useRef } from "react";
import { styled } from "styled-components";
import Scratch from "../molecules/Scratch";
import Footer from "../../layout/Footer";
import VerticalLine from "../atoms/VerticalLine";
import paint1 from "../../assets/splash_paint/paint1.svg";
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
        {" "}
        <Scratch
          scrollYProgress={scrollYProgress}
          text="저의 포트폴리오를 읽어주신 분들과 함께 성장할 기회를 기대하며, 저는 오늘도 맞닿은 문제를 해결을 하며 증명하기 위해 노력하겠습니다. 감사합니다."
          activeColor="#FFFFFF"
          inActiveColor="#383535"
        />
      </ScratchContainer>
      <h1 style={{ margin: "6rem 0", position: "relative" }}>
        <PaintBackground src={paint1} />
        Contact Us
      </h1>
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

const PaintBackground = styled.img`
  position: absolute;
  top: -50%;
  right: -10%;
  width: 50%;
  height: 200%;
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
