import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  ref?: React.Ref<HTMLHeadingElement | null>;
}

const Heading = ({ children, ref }: HeadingProps) => {
  return <h1 ref={ref}>{children}</h1>;
};

export default Heading;
