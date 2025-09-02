import {
  SKILL_ICONS_DEFUALT_GAP,
  SKILL_ICONS_MOBILE_GAP,
  SKILL_ICON_DEFUALT_WIDTH,
  SKILL_ICON_MOBILE_WIDTH,
} from "../constants/skillsConstants";
import { Mode } from "../stores/useScreenStore";
import { CalculatetabWidth } from "../types/helper";
import { MotionValue } from "motion";

export const calculatetabWidth = ({ id, ref }: CalculatetabWidth) => {
  const el = ref.current[id];
  if (!el) return 0;

  return el.offsetWidth;
};

export const isScrollingBookSection = (n: number) => n > 0 && n < 1;

export const getSkillIconWidth = (mode: Mode) => {
  return mode !== "mobile" ? SKILL_ICON_DEFUALT_WIDTH : SKILL_ICON_MOBILE_WIDTH;
};

export const getSkillIconsGap = (mode: Mode) => {
  return mode !== "mobile" ? SKILL_ICONS_DEFUALT_GAP : SKILL_ICONS_MOBILE_GAP;
};

export const getSKillIconsWidth = (
  iconWidth: number,
  iconGap: number,
  totalLength: number
) => {
  return `${iconWidth * totalLength + iconGap * (totalLength - 1)}rem`;
};

export const getScratchHighlightIndex = (
  latest: number,
  textLength: number
) => {
  const highlightIndex = Math.floor((Math.round(latest) / 100) * textLength);

  return highlightIndex;
};

export const getParallaxActiveIndex = (latest: number, dataLength: number) => {
  const newIndex = Math.min(Math.floor(latest * dataLength), dataLength - 1);
  return newIndex;
};

export const getImageParallaxYByOrder = ({
  currentIdx,
  totalLength,
  initialY,
  lastY,
}: {
  currentIdx: number;
  totalLength: number;
  initialY: MotionValue<string>;
  lastY: MotionValue<string>;
}) => {
  const y =
    currentIdx === 0 ? initialY : currentIdx === totalLength - 1 ? lastY : 0;
  return y;
};
