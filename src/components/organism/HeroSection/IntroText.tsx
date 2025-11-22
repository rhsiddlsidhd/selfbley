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

// const self

const WELCOMEINTRO = "프론트엔드 개발 경험의 모든 것을 소개합니다. ";

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
      <Text $fontSize="clamp3" variants={contentTextItemReveal}>
        <TextGlass>FE 개발자 신영재</TextGlass>
      </Text>

      <Text $fontSize="clamp6" variants={contentTextItemReveal}>
        <TextGlass>{WELCOMEINTRO}</TextGlass>
      </Text>

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

const TextGlass = styled.span`
  display: inline-block;
  padding: 8px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.06);
  width: 100%;
  text-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
`;

const contentTextItemReveal = {
  hidden: {
    scale: 0,
    y: 10,
  },
  show: {
    scale: 1,
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

const ContentWrapper = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  z-index: 5;
  width: 100%;
`;
