import React, { Fragment } from "react";
import { motion } from "motion/react";

const Title = ({ text }: { text: string }) => {
  return (
    <Fragment>
      {[text].map((word, i) => {
        return (
          <motion.p key={i} variants={titleItem}>
            {word}
          </motion.p>
        );
      })}
    </Fragment>
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
