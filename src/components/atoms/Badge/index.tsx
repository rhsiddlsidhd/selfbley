import styled from "styled-components";
import { BADGE_COLORS_KEY } from "../../../types/style";

interface BadgeProps {
  name: string;
  $key: BADGE_COLORS_KEY;
  $width?: string;
}

const Badge = ({ name, $width, $key }: BadgeProps) => {
  return (
    <StyledBadge $key={$key} $width={$width}>
      {name}
    </StyledBadge>
  );
};

export default Badge;

const StyledBadge = styled.span<{ $key: BADGE_COLORS_KEY; $width?: string }>`
  ${({ theme }) => theme.FLEX_CENTER}
  width: ${({ $width }) => $width ?? "fit-content"};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.COLORS.white};
  background-color: ${({ $key, theme }) => theme.BADGE_COLORS[$key]};
  padding: 0.5rem 0.25rem;
  margin: 0.25rem 0;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.FONT_SIZE.clamp6};
`;
