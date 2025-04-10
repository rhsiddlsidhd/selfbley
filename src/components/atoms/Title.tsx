import React from "react";
import { TEXTS } from "../../constants/textConstants";
import { motion } from "motion/react";

const Title = () => {
  return (
    <>
      {[...TEXTS.TITLE].map((word, i) => {
        return (
          <motion.span key={i} variants={titleItem}>
            {word}
          </motion.span>
        );
      })}
    </>
  );
};

export default Title;

const titleItem = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
    },
  },
};
