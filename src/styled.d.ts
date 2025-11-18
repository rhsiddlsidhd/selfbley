import "styled-components";
import { RuleSet } from "styled-components";
import {
  BADGE_COLORS_KEY,
  COLORS_KEY,
  FONT_SIZE_KEY,
  FONT_WEIGHT_KEY,
} from "./types/style";

declare module "styled-components" {
  export interface DefaultTheme {
    COLORS: Record<COLORS_KEY, string>;
    FONT_SIZE: Record<FONT_SIZE_KEY, string>;
    FONT_WEIGHT: Record<FONT_WEIGHT_KEY, number>;
    BADGE_COLORS: Record<BADGE_COLORS_KEY, string>;
    FLEX_CENTER: RuleSet<object>;
    responseWidth: (n: number) => RuleSet<object>;
  }
}
