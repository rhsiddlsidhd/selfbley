import React from "react";
import styled from "styled-components";

const Main = () => {
  return (
    <>
      <Container>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i}></div>
        ))}
      </Container>
    </>
  );
};

export default Main;

const Container = styled.section`
  height: 100vh;
  display: flex;
  & > div {
    flex: 1;
    border-right: 1px solid #7178857a;
  }

  & > div:first-child,
  div:last-child {
    flex: 0.5;
  }
`;
