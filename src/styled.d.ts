import "styled-components";
import { RuleSet } from "styled-components";
import { COLORS_KEY, FONT_SIZE_KEY, FONT_WEIGHT_KEY } from "./styles/type";

declare module "styled-components" {
  export interface DefaultTheme {
    COLORS: Record<COLORS_KEY, string>;
    FONT_SIZE: Record<FONT_SIZE_KEY, string>;
    FONT_WEIGHT: Record<FONT_WEIGHT_KEY, number>;

    FLEX_CENTER: RuleSet<object>;

    responseWidth: (n: number) => RuleSet<object>;
  }
}
