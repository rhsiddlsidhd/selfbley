import { useRef, useState } from "react";
import styled from "styled-components";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";

import SVGContainer from "../../template/container/SVGContainer";
import Sign from "../../atoms/Sign";
import Background from "./Background";
import FAQList from "./FAQList";
import { faqList } from "./constant";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress: total } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    total,
    [0, 0.25, 0.75, 1],
    ["-50%", "0%", "0%", "50%"]
  );

  useMotionValueEvent(total, "change", (latest) => {
    const newIndex = Math.min(
      Math.floor(latest * faqList.length),
      faqList.length - 1
    );
    setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
  });

  return (
    <Container ref={containerRef}>
      <SVGContainer
        isInView={true}
        $width={1.5}
        style={{ top: "5%", right: "5%" }}
      >
        <Sign type={3} />
      </SVGContainer>

      <SVGContainer
        isInView={true}
        $width={0.5}
        style={{ top: "15%", left: "5%" }}
      >
        <Sign type={2} />
      </SVGContainer>

      <SVGContainer
        isInView={true}
        $width={2}
        style={{ top: "25%", right: "15%" }}
      >
        <Sign type={1} />
      </SVGContainer>

      <SVGContainer
        isInView={true}
        $width={1}
        style={{ top: "45%", left: "5%" }}
      >
        <Sign type={0} />
      </SVGContainer>

      <SVGContainer
        isInView={true}
        $width={0.5}
        style={{ top: "60%", right: "30%" }}
      >
        <Sign type={3} />
      </SVGContainer>

      <SVGContainer
        isInView={true}
        $width={2}
        style={{ top: "80%", right: "5%" }}
      >
        <Sign type={1} />
      </SVGContainer>

      <SVGContainer
        isInView={true}
        $width={1.5}
        style={{ top: "95%", left: "5%" }}
      >
        <Sign type={2} />
      </SVGContainer>

      <Background activeIndex={activeIndex} y={y} />

      <FAQList />
    </Container>
  );
};

export default FAQSection;

const Container = styled.section`
  position: relative;
`;
