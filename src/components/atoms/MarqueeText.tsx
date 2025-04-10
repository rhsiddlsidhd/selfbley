import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { motion } from "motion/react";

interface MarqueeTextProps {
  children: string | React.ReactNode;
  reverse?: boolean;
  deg?: number;
}

const MarqueeText = ({
  deg = 0,
  reverse = false,
  children,
}: MarqueeTextProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  /**
   * children 요소를 복사하여 뒤에 이어 붙여서 두배의 길이를 만든다.
   * 하나의 children 요소의 길이만큼 translateX(-100%)의 길이만큼 이동했을때 translateX(0) 으로 전환
   * 문제점 1.
   *  if vw 가 children 요소보다 크다면?
   *  if translateX(-100%) 시의 content내용과 translate(0%) 의 content내용이 이어지지 않는다면 ?
   * if vw가 marquee 요소보다 조금 작을때 너무 많은 animation을 요구하면 ?
   * => childrent 요소를 복사해서 ++
   * => translateX의 비율을 총 복사된 길이만큼 이동되었을때 (즉,, 100%가 될수도 있을듯)
   * => basic으로 clone을 1로 제공하여 잦은 animation 방지
   *
   */

  const calculateMultiplier = useCallback(() => {
    if (!containerRef.current || !textRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const textRect = textRef.current.getBoundingClientRect();

    const containerWidth = containerRect.width;
    const textWidth = textRect.width;

    if (textWidth < containerWidth) {
      setMultiplier(Math.ceil(containerWidth / textWidth));
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    calculateMultiplier();
    if (containerRef.current && textRef.current) {
      const resizeObserver = new ResizeObserver(() => calculateMultiplier());
      resizeObserver.observe(containerRef.current);
      resizeObserver.observe(textRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [calculateMultiplier, isMounted]);

  const multiplyChildren = useCallback(
    (multiplier: number) => {
      const arraySize = multiplier >= 0 ? multiplier : 0;
      return [...Array(arraySize)].map((_, i) => (
        <Fragment key={i}>
          {children}
          {"\u00A0"}
        </Fragment>
      ));
    },
    [children]
  );

  const marqueeAnimation = {
    x: reverse ? [0, "100%"] : [0, "-100%"],
    transition: {
      duration: 10,
      ease: "linear",
      repeat: Infinity,
    },
  };

  if (!isMounted) return null;
  // animate={marqueeAnimation}
  return (
    <Marquees $deg={deg} $reverse={reverse} ref={containerRef}>
      <Marquee animate={marqueeAnimation}>
        <div className="firstMarquee" ref={textRef}>
          {children}
        </div>
        {multiplyChildren(multiplier - 1)}
      </Marquee>
      <Marquee animate={marqueeAnimation}>
        <div className="firstMarquee" ref={textRef}>
          {children}
        </div>
        {multiplyChildren(multiplier - 1)}
      </Marquee>
    </Marquees>
  );
};

export default MarqueeText;

const Marquees = styled.div<{ $deg: number; $reverse: boolean }>`
  display: flex;
  flex-shrink: 0;
  /* padding: 2rem; */

  justify-content: ${({ $reverse }) => ($reverse ? "end" : "start")};
  transform: ${({ $deg }) => `rotate(${$deg}deg)`};
`;

const Marquee = styled(motion.div)`
  display: flex;
  flex-shrink: 0;
  min-width: min-content;
  z-index: 50;
  cursor: pointer;

  .firstMarquee {
    display: flex;
    flex-shrink: 0;
  }
`;
