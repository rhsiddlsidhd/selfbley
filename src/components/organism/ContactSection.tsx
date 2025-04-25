import { useScroll } from "motion/react";
import { useRef } from "react";
import { styled } from "styled-components";
import Scratch from "../molecules/Scratch";

const ContactSection: React.FC = () => {
  const scratchRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scratchRef,
    offset: ["end end", "start start"],
  });

  return (
    <Container>
      <ContactScratchContainer ref={scratchRef}>
        <Scratch
          scrollYProgress={scrollYProgress}
          text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat enim blanditiis eius aspernatur repellat, itaque animi voluptas consequuntur aut porro recusandae nihil, quis esse sequi qui praesentium asperiores rem error!"
          activeColor="#FFFFFF"
          inActiveColor="#1b1b1b"
        ></Scratch>
      </ContactScratchContainer>
      <h1>Contact</h1>
      <Footer>
        <div>
          <span>who? </span>Created by YounJae Shin
        </div>
      </Footer>
    </Container>
  );
};

export default ContactSection;

const Container = styled.section`
  position: relative;
  background-color: black;
  height: 150vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContactScratchContainer = styled.div`
  height: 35%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = styled.footer`
  width: calc(100% / 6 * 4);
  height: 30%;
`;
