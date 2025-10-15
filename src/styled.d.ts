import "styled-components";
import { RuleSet } from "styled-components";
import { colors, fontSize } from "./styles/theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: colors;
    fontSize: fontSize;
    responseWidth: (n: number) => RuleSet<object>;
    flexCenter: RuleSet<object>;
  }
}
