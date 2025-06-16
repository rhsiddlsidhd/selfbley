import styled from "styled-components";
import { useEffect, useState } from "react";
import { weatherImgs } from "../../constants/imgs";

const MainLoading = ({
  onLoadingComplete,
  isVisible,
}: {
  onLoadingComplete: () => void;
  isVisible: boolean;
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (!isVisible) return;
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % weatherImgs.length);
    }, 100);

    const timeoutId = setTimeout(() => {
      onLoadingComplete();
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [isVisible, onLoadingComplete]);
  return (
    <Container $isVisible={isVisible}>
      <Wrapper srcSet={weatherImgs[activeIndex].srcSet} alt="이미지" />
    </Container>
  );
};

export default MainLoading;

const Container = styled.div<{ $isVisible: boolean }>`
  height: 100vh;
  position: relative;
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
`;

const Wrapper = styled.img`
  position: absolute;
  width: 10vw;
  min-width: 80px;
  max-width: 320px;
  height: 10vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
