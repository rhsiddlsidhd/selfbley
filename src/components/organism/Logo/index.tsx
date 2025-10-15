import styled, { css } from "styled-components";
import { useNavigate } from "react-router";
import useScreenStore, { Mode } from "../../../stores/useScreenStore";
import { LOGO_PATH } from "../../../constants/routes";

interface LogoProps {
  styles?: string;
  onCloseMenu?: () => void;
}

const Logo = ({ styles = "", onCloseMenu }: LogoProps) => {
  const mode = useScreenStore((state) => state.mode);
  const navigate = useNavigate();

  return (
    <Container
      $mode={mode}
      $styles={styles}
      onClick={() => {
        if (onCloseMenu) {
          onCloseMenu();
          setTimeout(() => {
            navigate(LOGO_PATH);
          }, 1000);
        } else {
          navigate(LOGO_PATH);
        }
      }}
    >
      <Overlay className="logo" $mode={mode}></Overlay>
      <Title className="logo">FRONTEND</Title>
    </Container>
  );
};

export default Logo;

const Container = styled.a<{ $mode: Mode; $styles: string }>`
  font-size: ${({ $mode, theme }) =>
    $mode !== "mobile" ? theme.FONT_SIZE.md : theme.FONT_SIZE.clamp4};
  cursor: pointer;
  ${({ $styles }) =>
    css`
      ${$styles}
    `}
  z-index: 101;
`;

const Overlay = styled.div<{ $mode: Mode }>`
  font-size: ${({ $mode, theme }) =>
    $mode !== "mobile" ? theme.FONT_SIZE.xl : theme.FONT_SIZE.clamp3};
  &::before {
    content: "PORTFOLIO";
    position: absolute;
    opacity: 0.5;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &::after {
    content: "PORTFOLIO";
    position: absolute;
    opacity: 0;
    left: 50%;
    transform: translate(-50%, 75%);
  }
  &:hover::before {
    opacity: 0;
    transform: translate(-50%, -125%);
    transition: transform 3s, opacity 2s;
  }
  &:hover::after {
    opacity: 0.5;
    transform: translate(-50%, -50%);
    transition: transform 3s, opacity 2s;
  }
  &:not(:hover)::before {
    opacity: 0.5;
    transform: translate(-50%, -25%);
    transition: transform 3s, opacity 2s;
  }

  &:not(:hover)::after {
    opacity: 0;
    transform: translate(-50%, 75%);
    transition: transform 3s, opacity 2s;
  }
`;

const Title = styled.p`
  font-weight: bold;
  display: flex;
  align-items: center;
`;
