import { useRef } from "react";
import { styled } from "styled-components";
import paint2 from "../../assets/splash_paint/paint2.svg";

import { logo } from "../../constants/textConstants";

const FooterLogo = () => {
  const textureRef = useRef<HTMLParagraphElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <Container ref={containerRef}>
      <PaintBackground src={paint2} alt="이미지" />
      <p
        // style={{ fontSize: `${fontSize}rem`, fontWeight: "bold" }}
        ref={textureRef}
      >
        {logo.toUpperCase()}
      </p>
    </Container>
  );
};

export default FooterLogo;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  & > p {
    font-size: 17.5vw;
    font-weight: bold;
  }
  z-index: 90;
`;

const PaintBackground = styled.img`
  position: absolute;
  width: 50%;
  height: 100%;
  left: 10%;
`;
