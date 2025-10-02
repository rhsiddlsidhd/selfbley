import { styled } from "styled-components";
import { motion, MotionValue, useMotionValueEvent } from "motion/react";
import { BookData } from "../organism/SliderSection";
import { useEffect } from "react";

const BookBackground = ({
  data,
  isFixed,
  activeIndex,
  initialTranslateY,
  lastTranslateY,
  generalY,
}: {
  data: BookData[];
  isFixed: boolean;
  activeIndex: number;
  initialTranslateY: MotionValue<string>;
  lastTranslateY: MotionValue<string>;
  generalY: MotionValue<string>;
}) => {
  return (
    <>
      {data.map(({ image }, i) => {
        const y = isFixed
          ? generalY
          : i === 0
          ? initialTranslateY
          : i === data.length - 1
          ? lastTranslateY
          : generalY;
        return (
          <motion.div
            key={i}
            style={{
              y,
              width: "90%",
              height: "90vh",
              position: "fixed",
              left: "50%",
              x: "-50%",
              top: 0,
              zIndex: 0,
            }}
            initial={false}
            animate={{ opacity: i === activeIndex ? 1 : 0 }}
          >
            <Background src={image} />
          </motion.div>
        );
      })}
    </>
  );
};

export default BookBackground;

const Background = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: blur(5px) brightness(0.3);
`;
