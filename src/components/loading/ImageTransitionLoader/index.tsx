import { useEffect, useState } from "react";
import { weatherImgs } from "../../../constants/imgs";
import styled from "styled-components";

const ImageTransitionLoader = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    window.document.body.style.overflow = "hidden";
    return () => {
      window.document.body.style.removeProperty("overflow");
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % weatherImgs.length);
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
