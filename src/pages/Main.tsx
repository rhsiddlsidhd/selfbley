import styled from "styled-components";
import VerticalLine from "../components/atoms/VerticalLine";

const Main = () => {
  return (
    <>
      <Container>
        {/* <MainLoading /> */}
        <VerticalLine page="MAIN" />
        <Home>
          {/* <video src={thetest} autoPlay loop muted /> */}
          {/* <img src={theForest} /> */}
        </Home>
      </Container>
    </>
  );
};

export default Main;

const Container = styled.div`
  /* width: 100%; */
`;

const Home = styled.div`
  width: 100%;
  height: 100vh;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  & > video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
