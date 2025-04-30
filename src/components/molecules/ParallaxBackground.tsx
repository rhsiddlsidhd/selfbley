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
              backgroundImage: `url(${src})`,
              y,
            }}
            animate={{
              opacity: activeIndex === i ? 1 : 0,
            }}
            transition={{ duration: 0.6 }}
            key={i}
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
  z-index: -1;
`;

const BackgroundImage = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  filter: grayscale(80%) brightness(60%);
`;
