import React from "react";
import styled from "styled-components";

interface HeadingProps {
  children: React.ReactNode;
  ref?: React.Ref<HTMLHeadingElement | null>;
}

const Heading = ({ children, ref }: HeadingProps) => {
  return <Text ref={ref}>{children}</Text>;
};

export default Heading;

const Text = styled.h1`
  font-size: inherit;
`;
