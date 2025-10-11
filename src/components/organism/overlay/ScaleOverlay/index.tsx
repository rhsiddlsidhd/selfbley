import { motion, MotionValue, useTransform } from "motion/react";
import styled from "styled-components";
import useScreenStore from "../../../../stores/useScreenStore";

interface ScaleOverlayProps {
  scrollYProgress: MotionValue<number>;
}

const OverlayItemRow = ({
  scrollYProgress,
  offset,
}: ScaleOverlayProps & { offset: number }) => {
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

const ScaleOverlay = ({ scrollYProgress }: ScaleOverlayProps) => {
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

export default ScaleOverlay;

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
`;

const Item = styled(motion.div)`
  flex: 1;
  background-color: black;
  transform-origin: left top;
`;
