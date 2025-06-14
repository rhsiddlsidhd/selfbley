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
  { id: 0, top: "20%", left: "0%", width: 1.5 },
  {
    id: 1,
    top: "35%",
    right: "0",
    width: 2,
  },
  {
    id: 2,
    bottom: "10%",
    right: "50%",
    transform: "translateX(50%)",
  },
  {
    id: 3,
    bottom: "20%",
    right: "15%",
    transform: "translateX(50%)",
  },
];

export const parallaxSignSVGPosition: SVGs[] = [
  { id: 0, top: "5%", right: "5%", width: 1.5 },
  { id: 1, top: "10%", left: "5%", width: 0.5 },
  { id: 2, top: "25%", right: "15%", width: 2 },
  { id: 3, top: "50%", left: "5%", width: 1 },
  { id: 0, top: "55%", right: "5%", width: 2 },
  { id: 1, top: "65%", right: "40%", width: 1.5 },
  { id: 2, top: "90%", right: "35%", width: 1 },
];

export const sliderSignSVGPosition: SVGs[] = [
  { id: 0, top: "10%", left: "10%", width: 0.2 },
  { id: 1, top: "30%", left: "50%", width: 0.2 },
  { id: 2, top: "50%", left: "80%", width: 0.2 },
];
