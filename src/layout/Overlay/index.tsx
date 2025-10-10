import { motion, useTransform } from "motion/react";
import styled from "styled-components";
import useScreenStore from "../../stores/useScreenStore";

const OverlayItemRow = ({
  scrollYProgress,
  offset,
}: {
  scrollYProgress: any;
  offset: number;
}) => {
  const scale = useTransform(scrollYProgress, [offset, 0.95], [0, 1]);
  return (
    <Item
      transition={{
        duration: 0.3,
        type: "tween",
        ease: "easeIn",
      }}
      style={{ scaleX: scale }}
    />
  );
};

const Overlay = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const mode = useScreenStore((state) => state.mode);

  return (
    <Container>
      {Array.from({ length: mode !== "mobile" ? 6 : 4 }, (_, i) => {
        return (
          <OverlayItemRow
            offset={i * 0.1}
            scrollYProgress={scrollYProgress}
            key={i}
          />
        );
      })}
    </Container>
  );
};

export default Overlay;

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 6;
  display: flex;
`;

const Item = styled(motion.div)`
  flex: 1;
  background-color: black;
  transform-origin: left top;
  /* transform: scaleX(0.6); */
`;
