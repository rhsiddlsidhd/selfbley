import { css, DefaultTheme } from "styled-components";

export const BADGE_COLORS = {
  language: "rgb(253, 185, 11)",
  frontend: "rgb(52, 152, 219)",
  backend: "rgb(39, 174, 96)",
  etc: "rgb(127, 140, 141)",
  SINGLE: "rgb(220, 53, 69)",
  TEAM: "rgb(119, 175, 156)",
} as const;

export const COLORS = {
  black: "#010101",
  deepGray: "#6e6d6d",
  lightGray: "#bababa",
  lightCyan: "#98E9F4",
  white: "#f8f8f8",
  mint: "#8CBEC9",
  orange: "#ff6a41",
  pink: "#f50585",
  yellow: "#ffd34f",
} as const;

export const FONT_SIZE = {
  xs: "0.7rem",
  sm: "0.85rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  clamp1: "clamp(3rem, 8vw, 10rem)",
  clamp2: "clamp(2.4rem, 6.4vw, 8rem)",
  clamp3: "clamp(1.92rem, 5.12vw, 6.4rem)",
  clamp4: "clamp(1.54rem, 4.1vw, 5.12rem)",
  clamp5: "clamp(1.23rem, 3.28vw, 4.1rem)",
  clamp6: "clamp(0.98rem, 2.62vw, 3.28rem)",
  clamp7: "clamp(0.78rem, 2.1vw, 2.62rem)",
  clamp8: "clamp(0.62rem, 1.68vw, 2.1rem)",
  clamp9: "clamp(0.5rem, 1.34vw, 1.68rem)",
} as const;

export const FONT_WEIGHT = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

const responseWidth = (n: number) =>
  css`
    width: calc(100% / 6 * ${n});
  `;

const FLEX_CENTER = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const theme: DefaultTheme = {
  COLORS,
  BADGE_COLORS,

  FONT_SIZE,
  FLEX_CENTER,
  FONT_WEIGHT,

  responseWidth,
};

export default theme;
