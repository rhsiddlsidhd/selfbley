import "styled-components";
import { Colors, FontSize } from "./styles/type";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: Colors;
    fontSize: FontSize;
  }
}
