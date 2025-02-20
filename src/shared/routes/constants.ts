export const ROUTES = {
  Intro: "/",
  Skills: "/skills",
  Projects: "/projects",
  Career: "/career",
} as const;

export type ROUTESKeys = keyof typeof ROUTES;
