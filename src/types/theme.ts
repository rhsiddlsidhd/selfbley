import { colors, fontSize } from "../styles/theme";

export type Colorkeys = keyof typeof colors;

export type FontSizekeys = keyof typeof fontSize;

export interface Width {
  max: string;
}
