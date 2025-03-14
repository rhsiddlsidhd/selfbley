import styled, { css } from "styled-components";
import { Mode } from "./Header";
import { useNavigate } from "react-router";
import { handleNavigate } from "../../features/navigation/model/models";
import { ROUTES, ROUTESKeys } from "../../shared/routes/constants";

interface LogoProps {
  mode: Mode;
  styles?: string;
}

const Logo = ({ mode, styles = "" }: LogoProps) => {
  const navigate = useNavigate();
  return (
    <Container $mode={mode} $styles={styles}>
      <Section
        id="LOGO"
        onClick={(e) => {
          handleNavigate({
            routes: ROUTES,
            tap: e.currentTarget.id as ROUTESKeys,
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
  z-index: 5;
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
  z-index: 6;
`;
