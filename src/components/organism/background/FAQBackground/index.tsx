import { motion, MotionValue } from "motion/react";

import { styled } from "styled-components";
import Image from "../../../atoms/Image";

const backgroundImages = ["tennis-0", "tennis-1", "tennis-2"];

const FAQBackground = ({
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
          <Image
            key={i}
            src={`/tennis/${id}-760.webp 760w, /tennis/${id}-1280.webp 1280w, /tennis/${id}-1920.webp 1920w, /tennis/${id}-2560.webp 2560w`}
            style={{
              y,
              height: "100vh",
              objectFit: "cover",
              filter: "grayscale(100%) brightness(70%) blur(10px)",
            }}
            animate={{ opacity: activeIndex === i ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            alt="FAQ background image"
          />
        );
      })}
    </BackgroundWrapper>
  );
};

export default FAQBackground;

const BackgroundWrapper = styled(motion.div)`
  position: sticky;
  top: 0;
  z-index: 0;
`;
