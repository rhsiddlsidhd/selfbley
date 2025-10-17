import { useEffect, useState } from "react";

import styled from "styled-components";
import useDisableScroll from "../../../hooks/useDisableScroll";

const weatherLabel = ["flower", "spring", "summer"];

const ImageTransitionLoader = () => {
  useDisableScroll();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % weatherLabel.length);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [activeIndex]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
    >
      <ImageWrapper>
        {weatherLabel.map((label, i) => (
          <img
            key={i}
            srcSet={`/weather/${label}-160.webp, /weather/${label}-320.webp, /weather/${label}-640.webp`}
            alt={`weather image ${i}`}
            style={{
              opacity: i === activeIndex ? 1 : 0,
            }}
          />
        ))}
      </ImageWrapper>
    </div>
  );
};

export default ImageTransitionLoader;
const ImageWrapper = styled.div`
  width: 20vw;
  height: 20%;
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
`;
