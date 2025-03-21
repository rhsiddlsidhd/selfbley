import { useEffect, useState } from "react";
import styled from "styled-components";
export type BadgeTypes = "SINGLE" | "TEAM" | "FE" | "BE" | "ETC";

interface BadgeProps {
  type: BadgeTypes;
  name: string;
}

const Badge = ({ type, name }: BadgeProps) => {
  const [color, setColor] = useState<string>("inherit");

  const createBadgeColor = (type: BadgeTypes) => {
    const colors = {
      FE: "rgb(52, 152, 219)",
      BE: "rgb(39, 174, 96)",
      ETC: "rgb(127, 140, 141)",
      SINGLE: "rgb(220, 53, 69)",
      TEAM: "rgb(119, 175, 156)",
    };
    return colors[type];
  };

  useEffect(() => {
    setColor(createBadgeColor(type));
  }, [type]);

  return <StyledBadge $color={color}>{name}</StyledBadge>;
};

export default Badge;

const StyledBadge = styled.span<{ $color: string }>`
  width: fit-content;
  padding: 0.5rem;
  font-weight: bold;
  color: white;
  border-radius: 5px;
  background-color: ${({ $color }) => $color};
`;
