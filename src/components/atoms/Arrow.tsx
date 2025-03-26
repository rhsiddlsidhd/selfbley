import React from "react";
import { motion } from "motion/react";
import { TEXTS } from "../../constants/textConstants";

const Arrow = () => {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          type: "spring",
          repeat: Infinity,
          repeatType: "reverse",
        },
      }}
      style={{
        position: "absolute",
        rotate: 90,
        bottom: "-10rem",
        transformOrigin: "56% 50% 0",
      }}
    >
      {TEXTS.ARROW_ICON}
    </motion.div>
  );
};

export default Arrow;
