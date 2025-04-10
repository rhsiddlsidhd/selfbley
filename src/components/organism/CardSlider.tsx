import React from "react";
import styled, { css } from "styled-components";
import Card from "../atoms/Card";
import useScreenStore, { Mode } from "../../stores/useScreenStore";
import skills from "../../constants/skillsConstants";

const CardSlider = () => {
  const mode = useScreenStore((state) => state.mode);

  return (
    <CardWrapper $mode={mode}>
      {Object.entries(skills).map(([category, skillsList], i) => {
        return <Card key={i} category={category} skillsList={skillsList} />;
      })}
    </CardWrapper>
  );
};

export default CardSlider;

const CardWrapper = styled.div<{ $mode: Mode }>``;
