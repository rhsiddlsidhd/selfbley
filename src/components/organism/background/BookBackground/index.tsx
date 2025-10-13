import { styled } from "styled-components";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";

import { useState } from "react";
import {
  BookData,
  CARD_WRAPPER_WIDTH,
} from "../../../template/section/BooksSection";

const INITIAL_Y_OFFSET = -100;
const LAST_Y_OFFSET = 100;

const BookBackground = ({
  data,
  scrollYProgress,
  isInView,
}: {
  data: BookData[];
  scrollYProgress: MotionValue<number>;
  isInView: boolean;
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const y = useTransform(
    scrollYProgress,
    [0, 1 / 6, 5 / 6, 1],
    [`${INITIAL_Y_OFFSET}%`, "0%", "0%", `${LAST_Y_OFFSET}%`]
  );

  const maxOffsetX = (data.length - 1) * CARD_WRAPPER_WIDTH;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const normalizedProgress = Math.max(
      0,
      Math.min(1, (latest - 1 / 6) / (4 / 6))
    );

    const offsetX = normalizedProgress * maxOffsetX;
    const newIndex = Math.min(
      Math.round(offsetX / CARD_WRAPPER_WIDTH),
      data.length - 1
    );

    setActiveIndex(newIndex);
  });

  if (!isInView) return null;

  return (
    <>
      {data.map(({ image }, i) => {
        return (
          <BackgroundWrapper
            key={i}
            style={{
              y,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === activeIndex ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <Background src={image} />
          </BackgroundWrapper>
        );
      })}
    </>
  );
};

export default BookBackground;

const BackgroundWrapper = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
`;

const Background = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: grayscale(0.7) brightness(0.35) blur(5px);
`;
