import styled from "styled-components";

export type BadgeTypes =
  | "SINGLE"
  | "TEAM"
  | "frontend"
  | "backend"
  | "etc"
  | "language";

interface BadgeProps {
  type: BadgeTypes;
  name: string;
}

const colors: Record<BadgeTypes, string> = {
  language: "rgb(253, 185, 11)",
  frontend: "rgb(52, 152, 219)",
  backend: "rgb(39, 174, 96)",
  etc: "rgb(127, 140, 141)",
  SINGLE: "rgb(220, 53, 69)",
  TEAM: "rgb(119, 175, 156)",
};

type BadgeColor = (typeof colors)[BadgeTypes];

const Badge = ({ type, name }: BadgeProps) => {
  return <StyledBadge $color={colors[type]}>{name}</StyledBadge>;
};

export default Badge;

const StyledBadge = styled.span<{ $color: BadgeColor }>`
  width: fit-content;
  padding: 0.5rem;
  font-weight: bold;
  color: white;
  border-radius: 5px;
  background-color: ${({ $color }) => $color};
`;
