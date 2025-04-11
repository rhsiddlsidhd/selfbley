import styled from "styled-components";

const TheSkills = () => {
  return (
    <Container>
      <Wrapper>
        {Array.from({ length: 4 }, (_, i) => {
          return (
            <Card key={i}>
              <El>{i}</El>{" "}
            </Card>
          );
        })}
      </Wrapper>
    </Container>
  );
};

export default TheSkills;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

const Wrapper = styled.section`
  border: 1px solid red;
  /* height: 50vh; */
  display: flex;
`;

const Card = styled.div`
  width: 25vw;
`;

const El = styled.div`
  width: 80%;
  aspect-ratio: 1/2;
  background-color: red;
`;
