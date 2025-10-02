import { MotionValue, motion, useTransform } from "motion/react";

import { styled } from "styled-components";
import { getImageParallaxYByOrder } from "../../utils/calculation";

const ParallaxBackground = ({
  imgs,
  scrollYProgressStart,
  scrollYProgressEnd,
  activeIndex,
}: {
  imgs: string[];
  scrollYProgressStart: MotionValue<number>;
  scrollYProgressEnd: MotionValue<number>;
  activeIndex: number;
}) => {
  const totalLength = imgs.length;
  const initialY = useTransform(scrollYProgressStart, [0, 1], ["-50%", "0%"]);
  const lastY = useTransform(scrollYProgressEnd, [0, 1], ["0%", "-50%"]);
  return (
    <BackgroundWrapper>
      {imgs.map((src, i) => {
        const y = getImageParallaxYByOrder({
          currentIdx: i,
          totalLength,
          initialY,
          lastY,
        });
        return (
          <BackgroundImage
            style={{
              y,
            }}
            srcSet={src}
            animate={{
              opacity: activeIndex === i ? 1 : 0,
            }}
            transition={{ duration: 0.6 }}
            key={i}
            loading="lazy"
          />
        );
      })}
    </BackgroundWrapper>
  );
};

export default ParallaxBackground;

const BackgroundWrapper = styled(motion.div)`
  position: sticky;
  top: 0;
  z-index: 1;
`;

const BackgroundImage = styled(motion.img)`
  width: 100%;
  height: 100vh;
  position: absolute;
  filter: grayscale(100%) brightness(70%) blur(5px);
  object-fit: cover;
`;
