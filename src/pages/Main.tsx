import styled from "styled-components";
import VerticalLine from "../components/atoms/VerticalLine";
import { useEffect } from "react";
import useAnimationProgressStore from "../stores/useAnimationProgress";
import MainLoading from "../components/loading/MainLoading";
import Home from "../components/organism/Home";

const Main = () => {
  const { type, setType } = useAnimationProgressStore();

  useEffect(() => {
    return () => setType("INITIAL");
  }, [setType]);

  return (
    <Container>
      <VerticalLine page="MAIN" />
      {type === "INITIAL" ? (
        <MainLoading onLoadingComplete={() => setType("PAGE_TRANSITION")} />
      ) : (
        <>
          <Home />
          <div style={{ height: "100vh", backgroundColor: "greenyellow" }}>
            123123
          </div>
        </>
      )}
    </Container>
  );
};

export default Main;

const Container = styled.section`
  position: relative;
`;
