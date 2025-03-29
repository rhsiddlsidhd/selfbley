import React from "react";
import styled, { css } from "styled-components";
import tennis0 from "../../assets/tennis0.jpg";
import tennis1 from "../../assets/tennis1.jpg";
const InterView = () => {
  const imgs = [`${tennis0}`, `${tennis1}`];
  const colors = ["red", "yellow", "green", "purple"];

  const interviews = [
    {
      styles: css`
        position: relative;
      `,
    },
  ];

  return (
    <Containter>
      {/* <FixedBackgroundImg style={{ backgroundImage: `url(${imgs[0]})` }} /> */}
      {/* {Array.from({ length: 3 }, (_, i) => {
        return (
          <Section $colors={colors[i]} key={i}>
            a
          </Section>
        );
      })} */}
      <Section>
        <div>1234</div>
      </Section>
    </Containter>
  );
};

export default InterView;

const Containter = styled.div`
  /* height: 200vh; */
  position: relative;
  & > div {
  }
  /* width: 100%; */
  /* height: 50vh; */
  /* & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top right;
  } */
`;

const FixedBackgroundImg = styled.div`
  /* position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; */
  border: 3px solid red;
  width: 100%;
  background-color: red;
`;

const Section = styled.section<{ $colors?: string }>`
  height: 100vh;
  background-color: ${({ $colors }) => $colors};
  & > div {
    background-color: red;
    position: absolute;
    top: 30%;
  }
`;
