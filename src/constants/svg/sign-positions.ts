import { paths } from "./sign-paths";

type PositionKeys = "top" | "bottom" | "right" | "left";

type Positions = {
  [key in PositionKeys]?: string | number;
};

type SVGs = { id: keyof typeof paths } & Positions & {
    transform?: string;
    width?: number;
  };

export const videoSectionSignSGVPositions: SVGs[] = [
  { id: 1, top: "35%", left: "20%", transform: "rotate(-20deg)", width: 1.5 },
  {
    id: 2,
    bottom: "35%",
    right: "10%",
    width: 2,
  },
  {
    id: 3,
    bottom: "25%",
    left: "35%",
    transform: "translateY(50%)",
  },
];

export const topMarqueeSignSVGPositions: SVGs[] = [
  { id: 0, top: "20%", left: "0%", width: 0.5 },
  {
    id: 2,
    top: "-15%",
    right: "0",
    width: 2,
  },
  {
    id: 3,
    bottom: "10%",
    right: "5%",
  },
];
