import { motion } from "motion/react";
import React from "react";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.8, transition: { duration: 2 } }}
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
