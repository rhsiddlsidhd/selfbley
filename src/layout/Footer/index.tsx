import { motion } from "motion/react";
import styled from "styled-components";
import Image from "../../components/atoms/Image";
import Text from "../../components/atoms/Text";
import Contact from "./Contact";

const logo = "portfolio";
const FooterLogo = () => {
  return (
    <Container>
      <Image src="/paint/paint2.svg" alt="이미지" />
      <Text $fontWeight="bold">{logo.toUpperCase()}</Text>
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }) => theme.FLEX_CENTER}
  position: relative;
  & > p {
    font-size: 17.5vw;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Title>
        <Image
          src="/paint/paint1.svg"
          alt="Contact Paint Background"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <Text $fontSize="clamp1" $fontWeight="bold">
          Contact Us
        </Text>
      </Title>
      <Contact />
      <FooterLogo />
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled(motion.footer)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.black};
  height: 100vh;
  z-index: 1;
`;
const Title = styled.div`
  position: relative;
  margin: 6rem 0;
`;
