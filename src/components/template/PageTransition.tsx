import { motion } from "motion/react";
import React, { useEffect } from "react";

import usePageTransitionStore from "../../stores/usePageTransitionStore";
import { useLocation } from "react-router";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const { state, setState } = usePageTransitionStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("state", state);
    setState("ENTER");
    // return () => setState("EXIT");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.8, transition: { duration: 1.5 } }}
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
