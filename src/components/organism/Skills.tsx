import React from "react";
import styled from "styled-components";

const Skills = () => {
  return (
    <Container>
      <CardWrapper>
        {Array.from({ length: 4 }, (_, i) => {
          return <Card key={i}>카드{i}</Card>;
        })}
      </CardWrapper>
    </Container>
  );
};

export default Skills;

const Container = styled.section`
  position: relative;
  height: 100vh;
  min-height: min-content;
  overflow: hidden;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: calc(50% * 4);

  border: 1px solid red;

  gap: 1rem;
`;

const Card = styled.div`
  border: 3px solid green;
  padding: 1rem;
  width: 50%;
`;
