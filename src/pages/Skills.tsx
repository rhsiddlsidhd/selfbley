import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const Skills = () => {
  const [init, setInit] = useState(true);

  return (
    <>
      {init ? (
        <BehindColor
          onAnimationEnd={() => setInit(false)}
          style={{ backgroundColor: "black" }}
        ></BehindColor>
      ) : (
        <Container>
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i}></div>
          ))}
        </Container>
      )}
    </>
  );
};

export default Skills;

const flipInY = keyframes`
  0% {
    transform: perspective(400px) rotateY(90deg);
    opacity: 0;
    background-color: black;
  }
  50% {
    transform: perspective(400px) rotateY(-10deg);
    opacity: 0.7;
  }
  100% {
    transform: perspective(400px) rotateY(0);
    opacity: 1;
    background-color: yellow;
  }
`;

const Container = styled.section`
  height: 100vh;
  display: flex;
  /* background-color: black; */
  & > div {
    flex: 1;
    border-right: 1px solid #7178857a;
    transform-style: preserve-3d;
  }

  & > div:first-child,
  div:last-child {
    flex: 0.5;
  }
`;

const BehindColor = styled.div`
  animation: ${flipInY} 1s ease-in-out forwards;
`;
