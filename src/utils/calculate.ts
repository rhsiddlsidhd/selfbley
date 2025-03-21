import { CalculatetabWidth } from "../types/helper";

export const calculatetabWidth = ({ id, ref }: CalculatetabWidth) => {
  if (!ref.current[id]) return 0;

  const underLineWidth = ref.current[id].offsetWidth;
  return underLineWidth;
};
