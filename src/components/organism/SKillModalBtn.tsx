import React from "react";

import { styled } from "styled-components";
import { AnimatePresence, motion } from "motion/react";
// ViewAllBtn 의 사이즈가 font 사이즈보다 작을떄는 Icon으로 대체
const SKillModalBtn = React.memo(
  ({
    isSticky,
    isModal,
    text,
  }: {
    isSticky: boolean;
    isModal: () => void;
    text: string;
  }) => {
    return (
      <ViewAllBtn
        animate={{
          opacity: isSticky ? 1 : 0,
          x: isSticky ? "70%" : "100%",
          y: "-50%",
        }}
        whileHover={{ x: 0 }}
        whileTap={{ scale: 0.95 }}
        onClick={isModal}
      >
        <AnimatePresence>
          <WordsWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {text.split(" ").map((word, i) => (
              <Words key={i}>
                {[...word].map((char, i) => (
                  <p key={i}>{char}</p>
                ))}
              </Words>
            ))}
          </WordsWrapper>
        </AnimatePresence>
      </ViewAllBtn>
    );
  }
);

export default SKillModalBtn;

const ViewAllBtn = styled(motion.div)`
  position: absolute;
  top: 50%;
  right: 0%;
  width: clamp(40px, 5vw, 100px);
  height: 70%;
  min-height: fit-content;
  border: 3px solid white;
  border-right: none;
  border-radius: 10px 0 0 10px;
  cursor: pointer;
`;

const Words = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 3vh, 1rem);

  & > p {
    display: flex;
    justify-content: center;
  }
`;
const WordsWrapper = styled(motion.div)`
  display: flex;
  height: 100%;

  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  gap: clamp(0, 3vh, 1rem);
`;
