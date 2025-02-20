import "styled-components";
import { Colors, FontSize } from "./shared/theme/model";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: Colors;
    fontSize: FontSize;
  }
}
