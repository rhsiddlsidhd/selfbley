import { CalculatetabWidth } from "../types/helper";

export const calculatetabWidth = ({ id, ref }: CalculatetabWidth) => {
  const el = ref.current[id];
  if (!el) return 0;

  return el.offsetWidth;
};

export const isScrollingBookSection = (n: number) => n > 0 && n < 1;
