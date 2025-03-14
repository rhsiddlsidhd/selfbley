import React from "react";
import ProjectLoading from "./ProjectLoading";
import styled from "styled-components";

const Projects = () => {
  return (
    <>
      <ProjectLoading />
      <Container>
        {Array.from({ length: 4 }, (_, i) => {
          return <Section key={i}></Section>;
        })}
      </Container>
    </>
  );
};

export default Projects;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;

  & > section {
    flex: 1;
    position: relative;
    background-color: transparent;
  }
  & > section:first-child,
  section:last-child {
    flex: 0.5;
  }
`;

const Section = styled.section`
  border-right: 1px solid #7178857a;
`;
