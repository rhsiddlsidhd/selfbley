import { css, DefaultTheme } from "styled-components";

export const colors = {
  black: "#010101",
  deepGray: "#434241",
  lightGray: "#bababa",
  lightCyan: "#98E9F4",
  white: "#f8f8f8",
  mint: "#8CBEC9",
} as const;

export const fontSize = {
  xs: "0.5rem",
  s: "0.75rem",
  m: "1rem",
  l: "1.25rem",
  xl: "1.5rem",
  h1: "clamp(3rem, 8vw, 10rem)",
  h2: "clamp(2.4rem, 6.4vw, 8rem)",
  h3: "clamp(1.92rem, 5.12vw, 6.4rem)",
  h4: "clamp(1.54rem, 4.1vw, 5.12rem)",
  h5: "clamp(1.23rem, 3.28vw, 4.1rem)",
  h6: "clamp(0.98rem, 2.62vw, 3.28rem)",
} as const;

const width = {
  max: "1024px",
};

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const theme: DefaultTheme = {
  colors,
  fontSize,
  flexCenter,
  width,
};

export default theme;
