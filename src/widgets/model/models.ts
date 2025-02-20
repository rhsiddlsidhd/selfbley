import { NavigateFunction } from "react-router";
import { ROUTES, ROUTESKeys } from "../../shared/routes/constants";

export type Skills =
  | "HTML"
  | "CSS"
  | "JAVASCRIPT"
  | "TYPESCRIPT"
  | "REACT"
  | "NODE.JS"
  | "MONGOOSE"
  | "MONGODB";

export interface BtnProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export interface HandleNavigate {
  routes: typeof ROUTES;
  tab: ROUTESKeys;
  navigate: NavigateFunction;
}
