import styled from "styled-components";
import Badge from "../atoms/Badge/index";
import { BADGE_COLORS_KEY } from "../../types/style";

interface BadgesProps {
  category: BADGE_COLORS_KEY;
  techList: string[];
}

const Badges = ({ category, techList }: BadgesProps) => {
  return (
    <StyledBadges>
      {techList.map((tech, i) => {
        return (
          <li key={i}>
            <Badge name={tech} $key={category} />
          </li>
        );
      })}
    </StyledBadges>
  );
};

export default Badges;

const StyledBadges = styled.ul`
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  list-style: none;
`;
