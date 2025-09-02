import styled from "styled-components";

const Thumbnail = ({ src }: { src: string }) => {
  return (
    <Container>
      <img srcSet={src} alt="thumbnail" loading="lazy" />
    </Container>
  );
};

export default Thumbnail;

const Container = styled.div`
  width: 100%;
  height: 40%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
