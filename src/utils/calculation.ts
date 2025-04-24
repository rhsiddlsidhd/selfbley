import {
  SKILL_CONTENT_DEFUALT_COLUMNS,
  SKILL_CONTENT_MOBILE_COLUMNS,
  SKILL_CONTENT_TOTAL_COLUMNS,
  SKILL_ICONS_DEFUALT_GAP,
  SKILL_ICONS_MOBILE_GAP,
  SKILL_ICON_DEFUALT_WIDTH,
  SKILL_ICON_MOBILE_WIDTH,
} from "../constants/skillsConstants";
import { Mode } from "../stores/useScreenStore";
import { CalculatetabWidth } from "../types/helper";

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

export const getSkillContentActiveColumn = (mode: Mode) => {
  return mode !== "mobile"
    ? SKILL_CONTENT_DEFUALT_COLUMNS
    : SKILL_CONTENT_MOBILE_COLUMNS;
};

export const getSkillContentWidth = (activeColumns: number) => {
  return `${(100 / SKILL_CONTENT_TOTAL_COLUMNS) * activeColumns}%`;
};
