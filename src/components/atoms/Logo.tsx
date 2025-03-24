import styled, { css } from "styled-components";
import { useNavigate } from "react-router";

import useScreenStore, { Mode } from "../../stores/useScreenStore";
import { ROUTES } from "../../constants/routes";
import { ROUTESKeys } from "../../types/routes";
import { handleNavigate } from "../../utils/navigation";

interface LogoProps {
  styles?: string;
}

const Logo = ({ styles = "" }: LogoProps) => {
  const mode = useScreenStore((state) => state.mode);
  const navigate = useNavigate();
  return (
    <Container $mode={mode} $styles={styles}>
      <Section
        id="LOGO"
        onClick={(e) => {
          handleNavigate({
            routes: ROUTES,
            tab: e.currentTarget.id as ROUTESKeys,
            navigate,
          });
        }}
      >
        <Overlay className="logo" $mode={mode}></Overlay>
        <Title className="logo">FRONTEND</Title>
      </Section>
    </Container>
  );
};

export default Logo;

const Container = styled.div<{ $mode: Mode; $styles: string }>`
  position: absolute;
  left: 0;
  font-size: ${({ $mode, theme }) =>
    $mode !== "mobile" ? theme.fontSize.m : theme.fontSize.h4};
  ${({ $styles }) =>
    css`
      ${$styles}
    `}
  z-index:11;
`;

const Section = styled.div`
  position: relative;
  cursor: pointer;
  padding: 0 1rem;
`;

const Overlay = styled.p<{ $mode: Mode }>`
  font-size: ${({ $mode, theme }) =>
    $mode !== "mobile" ? theme.fontSize.l : theme.fontSize.h3};

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
`;
