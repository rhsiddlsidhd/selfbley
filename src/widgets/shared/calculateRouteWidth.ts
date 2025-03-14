import { ROUTESKeys } from "../../shared/routes/constants";

export const calculateRouteWidth = ({ id, ref }: calculateRouteWidthProps) => {
  if (!ref.current[id]) return 0;

  const underLineWidth = ref.current[id].offsetWidth;
  return underLineWidth;
};

interface calculateRouteWidthProps {
  id: ROUTESKeys;
  ref: React.RefObject<Record<ROUTESKeys, HTMLParagraphElement | null>>;
}
