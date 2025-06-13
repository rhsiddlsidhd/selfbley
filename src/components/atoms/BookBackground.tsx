import { styled } from "styled-components";
import { motion, MotionValue } from "motion/react";
import { ExtendedBook } from "../organism/SliderSection";

const BookBackground = ({
  data,
  isFixed,
  activeIndex,
  initialTranslateY,
  lastTranslateY,
  generalY,
}: {
  data: ExtendedBook[];
  isFixed: boolean;
  activeIndex: number;
  initialTranslateY: MotionValue<string>;
  lastTranslateY: MotionValue<string>;
  generalY: MotionValue<string>;
}) => {
  return (
    <>
      {data.map(({ src, isFirst, isLast }, i) => {
        const y = isFixed
          ? generalY
          : isFirst
          ? initialTranslateY
          : isLast
          ? lastTranslateY
          : generalY;
        return (
          <motion.div
            key={i}
            style={{
              y,
              width: "100%",
              height: "100vh",
              position: isFixed ? "fixed" : "absolute",
              top: 0,
              zIndex: -1,
            }}
            initial={false}
            animate={{ opacity: i === activeIndex ? 1 : 0 }}
          >
            <Background $source={src} />
          </motion.div>
        );
      })}
    </>
  );
};

export default BookBackground;

const Background = styled.div<{ $source: string }>`
  width: 100%;
  height: 100%;
  background-image: ${({ $source }) => `url(${$source})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  filter: blur(0.5rem) brightness(0.4);
`;
