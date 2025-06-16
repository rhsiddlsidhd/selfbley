import styled from "styled-components";
import spring from "../assets/loading_section/background/spring-640.webp";

const TheSkills = () => {
  return (
    <Container>
      <Background src={spring} />
    </Container>
  );
};

export default TheSkills;

const Container = styled.section`
  position: relative;
  height: 100vh;
  z-index: 10;
`;

const Background = styled.img`
  position: absolute;
  width: 10%;
  min-width: 80px;
  max-width: 320px;
  aspect-ratio: 1/1;
  border: 3px solid white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
