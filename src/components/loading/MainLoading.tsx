import styled from "styled-components";
import { useEffect, useState } from "react";
import { weatherImgs } from "../../constants/imgs";

const MainLoading = ({
  onLoadingComplete,
  setState,
  isVisible,
}: {
  onLoadingComplete: boolean;
  isVisible: boolean;
  setState: () => void;
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (!isVisible) return;

    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % weatherImgs.length);
    }, 100);

    if (onLoadingComplete) {
      clearInterval(intervalId);
      setState();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isVisible, onLoadingComplete, setState]);

  return (
    <Container $isVisible={isVisible}>
      {weatherImgs.map((img, i) => (
        <img
          key={i}
          srcSet={img.srcSet}
          alt={`weather image ${i}`}
          style={{
            opacity: i === activeIndex ? 1 : 0,
          }}
        />
      ))}
    </Container>
  );
};

export default MainLoading;

const Container = styled.div<{ $isVisible: boolean }>`
  width: 20vw;
  height: 20%;
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  & > img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
  z-index: 99;
`;
