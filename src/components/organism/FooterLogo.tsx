import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import paint2 from "../../assets/splash_paint/paint2.svg";
import { calculateFontSize } from "../../utils/calculation";

const FooterLogo = () => {
  const textureRef = useRef<HTMLParagraphElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fontSize, setFontSize] = useState<number>(1);
  const logo = "portfolio";

  useEffect(() => {
    const handelResize = () => {
      const newFontSize = calculateFontSize({
        container: containerRef,
        texture: textureRef,
        initial: fontSize,
        offset: 0.25,
      });

      if (newFontSize !== fontSize) {
        setFontSize(newFontSize);
      }
    };
    handelResize();
    window.addEventListener("resize", handelResize);

    return () => {
      window.removeEventListener("resize", handelResize);
    };
  }, [fontSize]);

  return (
    <Container ref={containerRef}>
      <PaintBackground src={paint2} alt="이미지" />
      <p
        style={{ fontSize: `${fontSize}rem`, fontWeight: "bold" }}
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
`;

const PaintBackground = styled.img`
  position: absolute;
  width: 50%;
  height: 100%;
  left: 10%;
`;
