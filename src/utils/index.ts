export const getRandomSignType = (): 0 | 1 | 2 | 3 =>
  Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3;

export const getSVGWidth = (max: number): number => Math.random() * max;
