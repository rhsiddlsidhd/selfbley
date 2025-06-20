import { motion, MotionValue } from "motion/react";

const ProgressBar = (width: MotionValue<string>) => {
  return (
    <motion.hr
      style={{
        height: "5rem",
        backgroundColor: "red",
        position: "fixed",
        top: "0",
        left: 0,
        width,
      }}
    />
  );
};

export default ProgressBar;
