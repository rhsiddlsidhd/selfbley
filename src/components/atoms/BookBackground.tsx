import { styled } from "styled-components";
import { motion, MotionValue } from "motion/react";

const BookBackground = ({
  data,
  isFixed,
  activeIndex,
  initialTranslateY,
  lastTranslateY,
  generalY,
}: {
  data: any[];
  isFixed: boolean;
  activeIndex: number;
  initialTranslateY: MotionValue<string>;
  lastTranslateY: MotionValue<string>;
  generalY: MotionValue<string>;
}) => {
  return (
    <>
      {data.map(({ image, isFirst, isLast }, i) => {
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
