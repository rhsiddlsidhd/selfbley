import React from "react";
import { motion } from "motion/react";

const ScratchChar = React.memo(
  ({ char, color }: { char: string; color: string }) => {
    return (
      <motion.span
        style={{
          color,
        }}
        transition={{ type: "spring", duration: 1 }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    );
  }
);

export default ScratchChar;
