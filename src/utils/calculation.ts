import {
  SKILL_ICONS_DEFUALT_GAP,
  SKILL_ICONS_MOBILE_GAP,
  SKILL_ICON_DEFUALT_WIDTH,
  SKILL_ICON_MOBILE_WIDTH,
} from "../constants/skillsConstants";
import { Mode } from "../stores/useScreenStore";

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
