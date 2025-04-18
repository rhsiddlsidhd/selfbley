import { MotionValue } from "motion";
import { useMotionTemplate, useTransform } from "motion/react";
import React from "react";
interface UseScrollTemplatePctValue {
  scroll: MotionValue<number>;
  input: number[];
  output: number[];
  reverse: boolean;
}

const useScrollTemplatePctValue = ({
  scroll,
  input,
  output,
  reverse,
}: UseScrollTemplatePctValue) => {
  const n = useTransform(scroll, input, output);

  return useMotionTemplate`${reverse ? "-" : ""}${n}%`;
};

export default useScrollTemplatePctValue;
