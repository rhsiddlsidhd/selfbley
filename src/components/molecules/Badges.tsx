import React from "react";
import styled from "styled-components";
import Badge, { BadgeTypes } from "../atoms/Badge";
interface BadgesProps {
  category: BadgeTypes;
  techList: string[];
}

const Badges = ({ category, techList }: BadgesProps) => {
  return (
    <StyledBadges>
      {techList.map((tech, i) => {
        return (
          <li key={i}>
            <Badge type={category} name={tech} />
          </li>
        );
      })}
    </StyledBadges>
  );
};

export default Badges;

const StyledBadges = styled.ul`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  list-style: none;
  font-size: clamp(0.5rem, 1.5vw, 2rem);
  & > li {
    padding: 0.5rem 0;
  }
`;
