import styled from "styled-components";
import palm from "../../assets/palm.jpg";
import mountains from "../../assets/mountains.jpg";
import railroad from "../../assets/railroad.jpg";
import sunset from "../../assets/sunset.jpg";
import person from "../../assets/person.jpg";
import { useEffect, useState } from "react";

const MainLoading = ({
  onLoadingComplete,
}: {
  onLoadingComplete: () => void;
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const imgSrcs = [
    `${palm}`,
    `${mountains}`,
    `${railroad}`,
    `${sunset}`,
    `${person}`,
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % imgSrcs.length);
    }, 100);

    const timeoutId = setTimeout(() => {
      onLoadingComplete();
    }, 1500);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [imgSrcs.length, onLoadingComplete]);

  return (
    <Container>
      <Wrapper>
        <img src={imgSrcs[activeIndex]} alt="이미지" />
      </Wrapper>
    </Container>
  );
};

export default MainLoading;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: purple;
  filter: brightness(90%);
  clip-path: polygon(45% 40%, 55% 40%, 55% 60%, 45% 60%);
  & > img {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
