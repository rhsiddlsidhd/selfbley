import { motion } from "motion/react";
import { useState } from "react";
import styled from "styled-components";
import { AnimationProgressTypes } from "../../../pages/HomePage";
import Text from "../../atoms/Text";
import { BottomArrowIcon } from "../../atoms/Icon";

const handleFadeAnimation = ({
  state,
  isInView,
}: {
  state: AnimationProgressTypes;
  isInView: boolean;
}): "show" | "hidden" | "exit" => {
  if (!isInView) return "exit";

  return ["SCALE", "FADE"].includes(state) ? "show" : "hidden";
};

const WELCOMEINTRO = "Frontend Developer YoungJae";

const IntroText = ({ isInView }: { isInView: boolean }) => {
  const [animationProgress, setAnimationProgress] =
    useState<AnimationProgressTypes>("SCALE");

  return (
    <ContentWrapper
      variants={contentOpacity}
      initial="hidden"
      animate={handleFadeAnimation({ state: animationProgress, isInView })}
      onAnimationComplete={() =>
        setAnimationProgress((prev) => (prev === "SCALE" ? "FADE" : prev))
      }
    >
      {WELCOMEINTRO.split(" ").map((text, i) => {
        return (
          <Text
            $fontSize="clamp3"
            $fontWeight="bold"
            key={i}
            variants={contentTextItemReveal}
          >
            {text}
          </Text>
        );
      })}
      {animationProgress === "FADE" && (
        <IconWrapper
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: [10, 0, 10], opacity: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            type: "tween",
          }}
        >
          <BottomArrowIcon />
        </IconWrapper>
      )}
    </ContentWrapper>
  );
};

export default IntroText;

const contentTextItemReveal = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const IconWrapper = styled(motion.div)`
  position: absolute;
  width: ${({ theme }) => theme.FONT_SIZE.clamp3};
  aspect-ratio: 1/1;
  bottom: -50%;
`;

const contentOpacity = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
  exit: {
    display: "none",
  },
};

const ContentWrapper = styled(motion.h1)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
`;
