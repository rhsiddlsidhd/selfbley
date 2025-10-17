import { motion } from "motion/react";
import React from "react";

const OpacityTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export default OpacityTransition;
