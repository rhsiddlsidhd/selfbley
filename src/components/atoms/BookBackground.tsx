import { styled } from "styled-components";

const BookBackground = ({ src }: { src: string }) => {
  return <Background $source={src} />;
};

export default BookBackground;

const Background = styled.div<{ $source: string }>`
  width: 100%;
  height: 100%;
  background-image: ${({ $source }) => `url(${$source})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  filter: blur(0.5rem);
`;
