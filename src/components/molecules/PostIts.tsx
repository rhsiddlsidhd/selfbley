import { MotionValue, motion } from "motion/react";
import { Fragment, useState } from "react";
import { styled } from "styled-components";
import useScreenStore, { Mode } from "../../stores/useScreenStore";
import { QUESTIONS } from "../../constants/textConstants";

const PostIts = ({ blurTranslate }: { blurTranslate: MotionValue<string> }) => {
  const mode = useScreenStore((state) => state.mode);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <Fragment>
      {QUESTIONS.map((q, i) => {
        const { question, style, answer } = q;
        return (
          <QuestionSection key={i}>
            <BackgroundBlur
              style={{
                x: mode !== "desktop" ? "50%" : "-50%",
                y: blurTranslate,
              }}
            />
            <PostIt
              $mode={mode}
              $top={style.top}
              $left={style.left}
              onMouseEnter={() => {
                console.log(i);
                setActiveIndex(i);
              }}
              onMouseLeave={() => setActiveIndex(null)}
            >
              ❓질문 {i + 1} : {question}
              {activeIndex === i && (
                <AnswerTooltip
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  💬 {answer}
                </AnswerTooltip>
              )}
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
  z-index: 99;
`;

const PostIt = styled.div<{ $mode: Mode; $top: number; $left: number }>`
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
  padding: 12px 18px;
  backdrop-filter: blur(20px);
  cursor: pointer;
  z-index: 11;
  border-radius: 10px;
  box-shadow: "0 4px 10px rgba(0,0,0,0.3)";
`;

const AnswerTooltip = styled(motion.div)`
  position: fixed;
  top: calc(100% + 12px);
  left: 0;
  backdrop-filter: blur(20px);
  color: #fff;
  padding: 12px 18px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 100;
  font-size: clamp(0.75rem, 2vw, 1.5rem);
  font-weight: bold;
`;

const BackgroundBlur = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 50%;
  width: calc(100% / 6 * 2);
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 10;
`;
