import React from "react";
import { styled } from "styled-components";
import SignSVG from "../atoms/SignSVG";
import { paths } from "./../../constants/svg/sign-paths";

const MainSignSVGContainer = () => {
  type PositionKeys = "top" | "bottom" | "right" | "left";

  type Positions = {
    [key in PositionKeys]?: string | number;
  };

  type SVGs = { id: keyof typeof paths } & Positions;

  const positions: SVGs[] = [
    { id: 1, top: "50%", left: "10%" },
    { id: 2, top: "30%", right: "10%" },
  ];

  return (
    <Container>
      {positions.map(({ id, top, left, right, bottom }) => {
        return (
          <SVGWrapper0 key={id} style={{ top, left, right, bottom }}>
            <SignSVG type={id}></SignSVG>
          </SVGWrapper0>
        );
      })}
    </Container>
  );
};

export default MainSignSVGContainer;

const Container = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  /* background-color: red; */
  width: 100%;

  height: 100%;
  z-index: 99;
`;

const SVGWrapper0 = styled.div`
  width: calc(100% / 6 * 2);
  position: absolute;
  z-index: 99;
`;

const SVGWrapper1 = styled.div`
  width: calc(100% / 6 * 2);
  top: 10%;
  left: 20%;
`;

const SVGWrapper2 = styled.div`
  width: calc(100% / 6 * 2);
  top: 10%;
  left: 20%;
`;

const SVGWrapper3 = styled.div`
  width: calc(100% / 6 * 2);
  top: 10%;
  left: 20%;
`;
