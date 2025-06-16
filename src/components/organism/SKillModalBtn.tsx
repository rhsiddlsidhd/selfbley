import React from "react";

import { styled } from "styled-components";
import { motion } from "motion/react";
import useScreenStore from "../../stores/useScreenStore";
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
    const mode = useScreenStore((state) => state.mode);

    return (
      <ViewAllBtn
        animate={{
          opacity: isSticky ? 1 : 0,
          x: isSticky ? (mode === "mobile" ? "0%" : "70%") : "100%",
          y: "-50%",
        }}
        whileHover={{ x: 0 }}
        whileTap={{ scale: 0.95 }}
        onClick={isModal}
      >
        {text.split(" ").map((word, i) => (
          <Words key={i}>
            {[...word].map((char, i) => (
              <p key={i}>{char}</p>
            ))}
          </Words>
        ))}
      </ViewAllBtn>
    );
  }
);

export default SKillModalBtn;

const ViewAllBtn = styled(motion.div)`
  position: absolute;
  top: 50%;
  right: 0;
  width: calc(100% / 6 * 0.5);
  max-width: 4rem;
  padding: 0.75rem 0;
  border: 3px solid white;
  border-right: none;
  border-radius: 10px 0 0 10px;
  cursor: pointer;
`;

const Words = styled.div`
  & > p {
    display: flex;
    justify-content: center;
  }
`;
