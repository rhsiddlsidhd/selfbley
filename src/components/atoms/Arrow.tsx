import { motion } from "motion/react";

const Arrow = ({ text }: { text: string }) => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
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
        bottom: "-50%",
        transformOrigin: "60% 50% 0",
      }}
    >
      {text}
    </motion.div>
  );
};

export default Arrow;
