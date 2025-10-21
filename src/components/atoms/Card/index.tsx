import React from "react";
import styled from "styled-components";
import useScreenStore, { Mode } from "../../../stores/screenStore";

const Card = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const mode = useScreenStore((state) => state.mode);

  return (
    <CardWrapper onClick={onClick} $mode={mode}>
      {children}
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div<{ $mode: Mode }>`
  ${({ theme, $mode }) =>
    $mode === "mobile"
      ? theme.responseWidth(5)
      : $mode === "tablet"
      ? theme.responseWidth(4)
      : theme.responseWidth(2)}

  min-width: 200px;
  max-width: 575px;
  aspect-ratio: 3/4;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  background-color: ${({ theme }) => theme.COLORS.white};
  color: ${({ theme }) => theme.COLORS.black};
  cursor: pointer;
  margin: auto;

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.orange};
    p {
      color: ${({ theme }) => theme.COLORS.white};
    }
  }
`;
