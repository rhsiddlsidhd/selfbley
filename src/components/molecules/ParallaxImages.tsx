import { motion, MotionValue } from "motion/react";

import { styled } from "styled-components";

const backgroundImages = ["tennis-0", "tennis-1", "tennis-2"];

const ParallaxImages = ({
  activeIndex,
  y,
}: {
  activeIndex: number;
  y: MotionValue<string>;
}) => {
  return (
    <BackgroundWrapper>
      {backgroundImages.map((id, i) => {
        return (
          <BackgroundImage
            key={i}
            srcSet={`/tennis/${id}-760.webp 760w, /tennis/${id}-1280.webp 1280w, /tennis/${id}-1920.webp 1920w, /tennis/${id}-2560.webp 2560w`}
            style={{ y }}
            animate={{
              opacity: activeIndex === i ? 1 : 0,
            }}
            transition={{ duration: 0.6 }}
            loading="lazy"
          />
        );
      })}
    </BackgroundWrapper>
  );
};

export default ParallaxImages;

const BackgroundWrapper = styled(motion.div)`
  position: sticky;
  top: 0;
  z-index: 1;
`;

const BackgroundImage = styled(motion.img)`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  filter: grayscale(100%) brightness(70%) blur(10px);
  object-fit: cover;
`;
