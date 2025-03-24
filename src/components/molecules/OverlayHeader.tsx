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
      <div
        onClick={() => {
          closeOverlayMenu();
        }}
      >
        <Logo
          styles={`left: 50%; transform: translate(-50%, 0%); margin-top:3rem; `}
        />
      </div>
      {!isView && (
        <MenuBtn onClick={openOverlayMenu}>
          <h3>Menu</h3>
        </MenuBtn>
      )}
      {(isView || animationProgress) && (
        <NavWrapper
          $animationProgress={animationProgress}
          onAnimationEnd={(e) => endSlideAnimation(e)}
        >
          <div onClick={closeOverlayMenu}>
            <Logo
              styles={`left: 50%; transform: translate(-50%, 0%); top:0; margin-top:3rem;`}
            />
            <MenuItems>
              <Nav />
            </MenuItems>
            <MenuBtn>
              <h3>Close</h3>
            </MenuBtn>
          </div>
        </NavWrapper>
      )}
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

const MenuItems = styled.section`
  height: calc(65vh - 20rem);
  display: flex;
  flex-direction: column;
`;

const NavWrapper = styled.div<{ $animationProgress: boolean }>`
  width: 100%;
  height: 100vh;
  min-height: 20rem;
  background-color: black;
  animation: ${({ $animationProgress }) =>
    $animationProgress
      ? css`
          ${SlideOut} 1s ease forwards
        `
      : css`
          ${SlideIn} 2s ease forwards
        `};
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  z-index: 12;
`;

const MenuBtn = styled.button`
  border: none;
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
  z-index: 20;
`;
