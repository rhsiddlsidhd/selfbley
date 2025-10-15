import { motion } from "motion/react";
import { styled } from "styled-components";
import Footer from "../../../../layout/Footer";
import FooterLogo from "../../../organism/FooterLogo";

const ContactSection: React.FC = () => {
  return (
    <Container>
      <Title>
        <PaintBackground src="/paint/paint1.svg" />
        Contact Us
      </Title>
      <Footer />
      <FooterLogo />
    </Container>
  );
};

export default ContactSection;

const Title = styled.div`
  position: relative;
  font-size: ${({ theme }) => theme.FONT_SIZE.clamp1};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  margin: 6rem 0;
`;

const Container = styled(motion.section)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.black};
  height: 100vh;
`;

const PaintBackground = styled.img`
  position: absolute;
  top: -50%;
  right: -10%;
  width: 50%;
  height: 200%;
`;
