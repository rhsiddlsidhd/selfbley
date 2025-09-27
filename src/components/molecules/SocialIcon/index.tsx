import styled from "styled-components";
import githubSVG from "../../../assets/github.svg";
import tistorySVG from "../../../assets/tistory.svg";
import Icon from "../../atoms/Icon";

export type SocialType = "github" | "tistory";
type Size = "sm" | "md" | "lg" | "custom";
interface SocialSVGIconProps {
  type: SocialType;
  $size: Size;
  $custom?: string;
}

const socialIcons = {
  github: githubSVG,
  tistory: tistorySVG,
};

const iconSizes = {
  sm: "1.5rem",
  md: "2rem",
  lg: "2.5rem",
  custom: "2rem",
};

const SocialSVGIcon = ({ type, $size, $custom }: SocialSVGIconProps) => {
  return (
    <IconWrapper $size={$size} $custom={$custom}>
      <Icon source={socialIcons[type]} />
    </IconWrapper>
  );
};

export default SocialSVGIcon;

const IconWrapper = styled.div<Pick<SocialSVGIconProps, "$size" | "$custom">>`
  width: ${({ $size, $custom }) => (!$custom ? iconSizes[$size] : $custom)};
  position: relative;
  aspect-ratio: 1 / 1;
`;
