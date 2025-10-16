import styled from "styled-components";

const Image = ({
  src,
  alt,
  $objectFit,
}: {
  src: string;
  alt: string;
  $objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}) => {
  return (
    <Img
      src={src}
      alt={alt}
      style={{ objectFit: $objectFit ?? "contain" }}
      loading="lazy"
    />
  );
};

export default Image;

const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 0.25rem;
`;
