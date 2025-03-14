import "styled-components";
import { Width } from "./shared/theme/model";

import { RuleSet } from "styled-components";
import { colors, fontSize } from "./shared/theme/theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: colors;
    fontSize: fontSize;
    width: Width;
    flexCenter: RuleSet<object>;
  }
}
