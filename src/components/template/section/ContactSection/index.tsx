import { motion } from "motion/react";
import { styled } from "styled-components";
import Footer from "../../../../layout/Footer";
import FooterLogo from "../../../organism/FooterLogo";

const ContactSection: React.FC = () => {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, backgroundColor: "#000000" }}
      transition={{ duration: 1 }}
    >
      <h1 style={{ margin: "6rem 0", position: "relative", zIndex: 90 }}>
        <PaintBackground src="/paint/paint1.svg" />
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
  justify-content: space-between;
  align-items: center;
  z-index: 7;
  height: 100vh;
`;

const PaintBackground = styled.img`
  position: absolute;
  top: -50%;
  right: -10%;
  width: 50%;
  height: 200%;
`;
