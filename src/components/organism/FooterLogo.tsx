import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import paint2 from "../../assets/splash_paint/paint2.svg";
import { calculateFontSize } from "../../utils/calculation";
import { logo } from "../../constants/textConstants";

const FooterLogo = () => {
  const textureRef = useRef<HTMLParagraphElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fontSize, setFontSize] = useState<number>(1);
  const resizeHandler = useRef<() => void>(null);

  useEffect(() => {
    resizeHandler.current = () => {
      const newFontSize = calculateFontSize({
        container: containerRef,
        texture: textureRef,
        initial: fontSize,
        offset: 0.25,
      });
      setFontSize(newFontSize);
    };
  }, [fontSize]);

  useEffect(() => {
    if (!containerRef.current) return;

    let requestId: number | null = null;

    const observer = new ResizeObserver(() => {
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
      requestId = requestAnimationFrame(() => {
        if (resizeHandler.current) {
          resizeHandler.current();
        }
      });
    });
    observer.observe(containerRef.current);

    return () => {
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
      observer.disconnect();
    };
  }, []);

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
