import { motion } from "framer-motion";
import { Paths, paths } from "../../constants/animatedPaths";

interface AnimatedSVGProps {
  type: keyof Paths;
  pathLength: number[];
  opacity?: number[];
  times?: number[];
}

export default function AnimatedSVG({
  type,
  pathLength,
  times,
  opacity,
}: AnimatedSVGProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 341 303"
      width="100%"
      height="100%"
    >
      <motion.path
        d={paths[type]}
        stroke="whitesmoke"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={{
          pathLength: pathLength,
          opacity: [1, 1, 0, 0],
        }}
        transition={{
          duration: 15,
          times: [0, 0.15, 0.2, 1],
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </motion.svg>
  );
}

/**
 * 15초 이내에
 * 얼마동안 보여줄건지
 *
 * a = 0 ~ 2
 *
 * b = 5 ~ 7
 */
