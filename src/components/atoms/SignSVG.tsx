import { motion } from "framer-motion";
import { paths } from "./../../constants/svg/sign-paths";
import { getSVGConfig } from "../../utils/svg/helper";

interface SignSVGProps {
  type: keyof typeof paths;
  color?: string;
}

export default function SignSVG({ type, color = "whitesmoke" }: SignSVGProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={getSVGConfig(type).viewbox}
      width="100%"
      height="100%"
    >
      <motion.path
        d={paths[type]}
        stroke={color}
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={{
          pathLength: getSVGConfig(type).pathLength,
          opacity: getSVGConfig(type).opacity,
        }}
        transition={{
          duration: 8,
          times: getSVGConfig(type).times,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </motion.svg>
  );
}
