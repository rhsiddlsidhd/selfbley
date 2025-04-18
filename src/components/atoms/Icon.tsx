import React from "react";
import { styled } from "styled-components";

const Icon = ({
  source = "#",
  style,
}: {
  source: string;
  style?: React.CSSProperties;
}) => {
  return (
    <IconWrapper style={style}>
      <img src={source} alt="Tech icon" />
    </IconWrapper>
  );
};

export default Icon;

const IconWrapper = styled.div`
  & > img {
    width: 100%;
    height: 100%;
    padding: 0.25rem;
  }
`;
