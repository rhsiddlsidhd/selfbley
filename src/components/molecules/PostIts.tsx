import { MotionValue, motion } from "motion/react";
import React, { Fragment } from "react";
import { styled } from "styled-components";
import useScreenStore, { Mode } from "../../stores/useScreenStore";
import { QuestionsOmitSrc } from "../../constants/textConstants";

const PostIts = ({
  questions,
  blurTranslate,
}: {
  questions: QuestionsOmitSrc[];
  blurTranslate: MotionValue<string>;
}) => {
  const mode = useScreenStore((state) => state.mode);
  console.log(questions);
  return (
    <Fragment>
      {questions.map((q, i) => {
        const { question, style } = q;
        return (
          <QuestionSection key={i}>
            <BackgroundBlur
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                x: mode !== "desktop" ? "50%" : "-50%",
                y: blurTranslate,
              }}
            />
            <PostIt $mode={mode} $top={style.top} $left={style.left}>
              {question}
            </PostIt>
          </QuestionSection>
        );
      })}
    </Fragment>
  );
};

export default PostIts;

const QuestionSection = styled(motion.section)`
  height: 100vh;
  position: relative;
`;

const PostIt = styled.p<{ $mode: Mode; $top: number; $left: number }>`
  position: absolute;
  display: flex;
  top: ${({ $top }) => `${$top}%`};
  left: ${({ $mode, $left }) =>
    $mode !== "desktop" ? `calc(100% / 6 * 1)` : `calc(100% / 6 * ${$left})`};
  width: ${({ $mode }) =>
    $mode !== "desktop" ? `calc(100% / 6 * 4)` : `calc(100% / 6 * 2)`};
  word-break: keep-all;
  font-weight: bold;
  font-size: clamp(0.75rem, 2vw, 3rem);
  padding: 3rem;
  backdrop-filter: blur(20px);
`;

const BackgroundBlur = styled(motion.div)`
  width: calc(100% / 6 * 2);
  aspect-ratio: 1 / 1;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  z-index: -1;
`;
