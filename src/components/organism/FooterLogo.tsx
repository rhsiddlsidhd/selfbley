import React, { RefObject, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import paint1 from "../../assets/paint2.svg";
import { calculateFontSize } from "../../utils/calculation";

const FooterLogo = () => {
  const textureRef = useRef<HTMLParagraphElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fontSize, setFontSize] = useState<number>(1);
  const logo = "FRONTEND";

  useEffect(() => {
    const handelResize = () => {
      const newFontSize = calculateFontSize({
        container: containerRef,
        texture: textureRef,
        initial: fontSize,
        offset: 0.25,
      });
      setFontSize(newFontSize);
    };
    handelResize();
    window.addEventListener("resize", handelResize);

    return () => {
      window.removeEventListener("resize", handelResize);
    };
  }, [fontSize]);
  return (
    <Container ref={containerRef}>
      <PaintBackground src={paint1} alt="이미지" />
      <p
        style={{ fontSize: `${fontSize}rem`, fontWeight: "bold" }}
        ref={textureRef}
      >
        {logo}
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
`;

const PaintBackground = styled.img`
  position: absolute;
  width: 50%;
  height: 100%;
  left: 10%;
`;
