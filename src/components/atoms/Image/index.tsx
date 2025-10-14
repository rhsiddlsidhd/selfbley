import styled from "styled-components";

const Image = ({ src, alt }: { src: string; alt: string }) => {
  return <Img src={src} alt={alt} loading="lazy" />;
};

export default Image;

const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
