import { ROUTES } from "../constants/routes";

export type ROUTESKeys = keyof typeof ROUTES;

export interface HandleNavigate {
  routes: typeof ROUTES;
  tab: ROUTESKeys;
  navigate: NavigateFunction;
}
