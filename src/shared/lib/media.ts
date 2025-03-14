import { css, Interpolation } from "styled-components";

type Sizes = "large" | "medium" | "small";

const sizes: Record<Sizes, number> = {
  large: 1024,
  medium: 768,
  small: 576,
};

export const mediaQueries = (key: Sizes) => {
  return (
    first: TemplateStringsArray,
    ...interpolations: Interpolation<object>[]
  ) => css`
    @media (max-width: ${sizes[key]}px) {
      ${css(first, ...interpolations)}
    }
  `;
};
