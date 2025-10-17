type SignSVGConfig = {
  viewbox: string;
  pathLength: number[];
  opacity: number[];
  times: number[];
};
export const signSVGConfig: {
  [key in 0 | 1 | 2 | 3]: SignSVGConfig;
} = {
  0: {
    viewbox: "0 0 340 300",
    pathLength: [0, 1, 0, 0, 0],
    opacity: [0, 1, 0, 0, 0],
    times: [0, 0.15, 0.16, 1, 1],
  },
  1: {
    viewbox: "0 0 380 250",
    pathLength: [0, 0, 1, 0, 0],
    opacity: [0, 0, 1, 0, 0],
    times: [0, 0.25, 0.4, 0.41, 1],
  },
  2: {
    viewbox: "-120 0 500 400",
    pathLength: [0, 0, 1, 0, 0],
    opacity: [0, 0, 1, 0, 0],
    times: [0, 0.6, 0.75, 0.76, 1],
  },
  3: {
    viewbox: "0 0 341 303",
    pathLength: [0, 0, 1, 0, 0],
    opacity: [0, 0, 1, 0, 0],
    times: [0, 0.8, 0.95, 0.96, 1],
  },
};
