import { memo, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import SVGContainer from "../../template/container/SVGContainer";
import Sign from "../../atoms/Sign";
import Background from "./Background";
import FAQList from "./FAQList";
import { faqList } from "./constant";
import { getRandomSignType, getSVGWidth } from "../../../utils";

const SVGWrapper = memo(({ length }: { length: number }) => {
  const items = useMemo(() => {
    return Array.from({ length }, (_, i) => ({
      top: (100 / length) * i + Math.random(),
      left: i % 2 === 0 ? Math.floor(Math.random() * 11) : "auto",
      right: i % 2 !== 0 ? Math.floor(Math.random() * 11) : "auto",
      type: getRandomSignType(),
    }));
  }, [length]);

  return (
    <>
      {items.map((item, i) => (
        <SVGContainer
          $width={getSVGWidth(0.5)}
          style={{
            top: `${item.top}%`,
            left: `${item.left}%`,
            right: `${item.right}%`,
          }}
          isInView={true}
          key={i}
        >
          <Sign type={item.type} />
        </SVGContainer>
      ))}
    </>
  );
});

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
      <SVGWrapper length={6} />
      <Background activeIndex={activeIndex} y={y} />
      <FAQList />
    </Container>
  );
};

export default FAQSection;

const Container = styled.section`
  position: relative;
`;
