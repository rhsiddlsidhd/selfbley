import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Logo from "../atoms/Logo";
import Nav from "../atoms/Nav";

const OverlayHeader = () => {
  const [isView, setIsView] = useState<boolean>(false);
  const [animationProgress, setAnimationProgress] = useState<boolean>(false);

  const openOverlayMenu = () => {
    if (!isView) {
      setIsView(true);
    }
  };

  const closeOverlayMenu = () => {
    if (isView) {
      setAnimationProgress(true);
    }
  };

  const endSlideAnimation: React.AnimationEventHandler<HTMLDivElement> = (
    e
  ) => {
    if (e.target !== e.currentTarget || !animationProgress) return;
    setAnimationProgress(false);
    setIsView(false);
  };

  return (
    <>
      <Logo
        styles={`left: 50%; transform: translate(-50%, 0%); margin-top:3rem; position:fixed; `}
        onCloseMenu={closeOverlayMenu}
      />

      {(isView || animationProgress) && (
        <NavWrapper
          $animationProgress={animationProgress}
          onAnimationEnd={(e) => endSlideAnimation(e)}
        >
          <Nav onCloseMenu={closeOverlayMenu} />
        </NavWrapper>
      )}
      <MenuBtn
        onClick={() => (!isView ? openOverlayMenu() : closeOverlayMenu())}
      >
        <h3>{!isView ? "Menu" : "Close"}</h3>
      </MenuBtn>
    </>
  );
};

export default OverlayHeader;
const SlideIn = keyframes`
    0%{
        transform:translateY(100%);
        opacity: 1;
    }
    100%{
        transform: translateY(0);
        opacity: 1;
        
    }
`;

const SlideOut = keyframes`
    0%{
        transform:translateY(0);
    }
    100%{        
        transform: translateY(100%);
    }
`;

const NavWrapper = styled.div<{ $animationProgress: boolean }>`
  position: fixed;
  width: 100%;
  height: 100vh;
  padding: 10rem 0;
  background-color: black;
  overflow: scroll;
  z-index: 99;

  animation: ${({ $animationProgress }) =>
    $animationProgress
      ? css`
          ${SlideOut} 1s ease forwards
        `
      : css`
          ${SlideIn} 2s ease forwards
        `};
`;

const MenuBtn = styled.button`
  color: white;
  background-color: black;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem;
  border: 3px solid gray;
  border-radius: 15%;
  cursor: pointer;
  z-index: 99;
`;
