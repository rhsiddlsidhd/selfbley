export const ROUTES = {
  LOGO: "/",
  THESKILLS: "/skills",
  THEPROJECTS: "/projects",
  CONTACT: "/career",
} as const;

export type ROUTESKeys = keyof typeof ROUTES;
