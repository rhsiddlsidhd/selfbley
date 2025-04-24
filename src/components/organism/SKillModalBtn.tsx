import React, { useCallback } from "react";
import { btnText } from "../../constants/skillsConstants";
import { styled } from "styled-components";
import { motion } from "motion/react";

const SKillModalBtn = React.memo(
  ({ isSticky, isModal }: { isSticky: boolean; isModal: () => void }) => {
    console.log("?");
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
        {btnText.split(" ").map((word, wordIdx) => (
          <div
            key={wordIdx}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {[...word].map((char, charIdx) => (
              <p key={charIdx}>{char}</p>
            ))}
          </div>
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
  width: clamp(50px, 5vw, 100px);
  height: 70%;
  border: 3px solid white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  cursor: pointer;
`;
