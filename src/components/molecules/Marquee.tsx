import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "motion/react";
import Heading from "../atoms/Heading";
interface MarqueeTextProps {
  text: string;
  reverse?: boolean;
  deg?: number;
}

const Marquee = ({ deg = 0, reverse = false, text }: MarqueeTextProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

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

  const multiplyChildren = useCallback(
    (multiplier: number) => {
      const arraySize = Math.max(multiplier, 0);

      return [...Array(arraySize)].map((_, i) => (
        <Heading key={i} renderContent={text} />
      ));
    },
    [text]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    calculateMultiplier();
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(() => calculateMultiplier());
      resizeObserver.observe(containerRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [calculateMultiplier, isMounted]);

  const marqueeAnimation = {
    x: reverse ? [0, "100%"] : [0, "-100%"],
    transition: {
      duration: 10,
      ease: "linear",
      repeat: Infinity,
    },
  };

  if (!isMounted) return null;

  return (
    <MarqueeTrack $deg={deg} $reverse={reverse} ref={containerRef}>
      {Array.from({ length: 2 }, (_, i) => {
        return (
          <MarqueeMessage animate={marqueeAnimation} key={i}>
            <Heading ref={textRef} renderContent={text} />
            {multiplyChildren(multiplier - 1)}
          </MarqueeMessage>
        );
      })}
    </MarqueeTrack>
  );
};

export default Marquee;

const MarqueeTrack = styled.div<{ $deg: number; $reverse: boolean }>`
  display: flex;
  white-space: nowrap;
  flex-shrink: 0;
  font-weight: bold;
  justify-content: ${({ $reverse }) => ($reverse ? "end" : "start")};
  transform: ${({ $deg }) => `rotate(${$deg}deg)`};
  padding: 3rem 0;
  z-index: 2;
`;

const MarqueeMessage = styled(motion.div)`
  display: flex;
  cursor: pointer;
  & > * {
    margin: 0 3rem;
  }
`;
