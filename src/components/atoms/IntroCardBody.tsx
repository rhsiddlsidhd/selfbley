import styled from "styled-components";

const IntroCardBody = ({ description }: { description: string }) => {
  const sentences = description.split(".").filter((word) => word !== "");

  return (
    <Container>
      {sentences.map((sentence, i) => {
        return <h6 key={i}>{sentence}.</h6>;
      })}
    </Container>
  );
};

export default IntroCardBody;

const Container = styled.div`
  height: 60%;
  overflow: auto;
  word-break: keep-all;
  padding: 0.5rem;
  & > h6 {
    margin-bottom: 1rem;
  }
`;
