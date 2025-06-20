import { motion } from "motion/react";
import React, { useEffect } from "react";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

export default PageTransition;
