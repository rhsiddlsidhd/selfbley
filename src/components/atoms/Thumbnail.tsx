import React from "react";
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
  border-radius: 1rem;
  width: 100%;
  height: 40%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    object-fit: cover;
  }
`;
