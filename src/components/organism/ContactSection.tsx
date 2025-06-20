import { motion, useScroll } from "motion/react";
import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import Scratch from "../molecules/Scratch";
import Footer from "../../layout/Footer";
import VerticalLine from "../atoms/VerticalLine";
import paint1 from "../../assets/splash_paint/paint1.svg";
import FooterLogo from "./FooterLogo";
import { contactScratchText } from "../../constants/scratchConstants";
import usePageTransitionStore from "../../stores/usePageTransitionStore";

const ContactSection: React.FC = () => {
  const { state, setState } = usePageTransitionStore();
  const scratchRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scratchRef,
    offset: ["start start", "center start"],
  });

  useEffect(() => {
    setState("ENTER");
  }, [state, setState]);
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, backgroundColor: "#000000" }}
      transition={{ duration: 1 }}
    >
      <VerticalLine page="MAIN" />
      <ScratchContainer ref={scratchRef}>
        <Scratch
          scrollYProgress={scrollYProgress}
          text={contactScratchText}
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

const Container = styled(motion.section)`
  position: relative;
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
