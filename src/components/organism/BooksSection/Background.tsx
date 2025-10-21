import { styled } from "styled-components";
import { motion, MotionValue } from "motion/react";

import { BookData } from ".";
import Image from "../../atoms/Image";

const Background = ({
  data,
  y,
  activeIndex,
  isInView,
}: {
  data: BookData[];
  y: MotionValue<string>;
  activeIndex: number;
  isInView: boolean;
}) => {
  if (!isInView) return null;

  return data.map(({ image }, i) => {
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
        <Image
          src={image}
          alt={`Book cover ${i + 1}`}
          style={{ filter: "grayscale(0.7) brightness(0.35) blur(5px)" }}
        />
      </BackgroundWrapper>
    );
  });
};

export default Background;

const BackgroundWrapper = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
`;
