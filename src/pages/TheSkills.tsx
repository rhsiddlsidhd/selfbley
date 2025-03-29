import { useInView } from "motion/react";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import VerticalLine from "../components/atoms/VerticalLine";

const TheSkills = () => {
  const selectedRef = useRef(null);
  const isInView = useInView(selectedRef, { amount: 0.3 });
  const colors = ["blue", "green", "yellow", "pink"];

  useEffect(() => {
    console.log(isInView);
  }, [isInView]);
  return (
    <>
      <VerticalLine page="MAIN" />

      {Array.from({ length: 4 }, (_, i) => (
        <Container
          key={i}
          className={`section_${colors[i]}`}
          $colors={colors[i]}
        ></Container>
      ))}
      <div ref={selectedRef}>123</div>
    </>
  );
};

export default TheSkills;
const Container = styled.section<{ $colors: string }>`
  height: 100vh;
  background-color: ${({ $colors }) => $colors};
`;
