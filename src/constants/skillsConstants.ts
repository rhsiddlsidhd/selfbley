export type TechnologyKey = keyof typeof technology;
export const VISIBLE_COUNT = 3;
export const centerOffset = Math.floor(VISIBLE_COUNT / 2);
const language = ["html", "css", "javascript", "typescript"];
const frontend = ["styledComponents", "react", "nextJs", "redux", "zustand"];
const backend = ["nodeJs", "nextJs", "express", "mongodb", "firebase"];

const etc = ["discord", "figma", "github"];

export const technology = {
  language,
  frontend,
  backend,
  etc,
};

export const skillOverview = "Learned SKILLS ";
export const SKILL_ICON_DEFUALT_WIDTH = 5;

export const SKILL_ICON_MOBILE_WIDTH = 3;

export const SKILL_ICONS_DEFUALT_GAP = 1;

export const SKILL_ICONS_MOBILE_GAP = 0.5;

export const SKILL_CONTENT_TOTAL_COLUMNS = 6;

export const SKILL_CONTENT_MOBILE_COLUMNS = 4;

export const SKILL_CONTENT_DEFUALT_COLUMNS = 2;

export const VERTICAL_COUNT_4 = 4;
export const VERTICAL_COUNT_3 = 3;
export const VERTICAL_COUNT_2 = 2;

export const VERTICAL_TOTAL_LINE = 6;

export const OPEN_MODAL_TEXT = "View All SKILLS";

export const CLOSE_MODAL_TEXT = "Close All SKILLS";
