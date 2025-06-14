import styled from "styled-components";

const Thumbnail = ({ src }: { src: string }) => {
  return (
    <Container>
      <img src={src} alt="thumbnail" />
    </Container>
  );
};

export default Thumbnail;

const Container = styled.div`
  height: 40%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
