import React, { RefObject, useRef, useState } from "react";
import { ROUTES, ROUTESKeys } from "../../shared/routes/constants";
import Logo from "./Logo";
import { Mode } from "./Header";
import styled from "styled-components";
import { handleNavigate } from "../../features/navigation/model/models";
import { useNavigate } from "react-router";
import { calculateRouteWidth } from "../shared/calculateRouteWidth";
type NavId = "expand" | "overlay";

interface NavProps {
  id: NavId;
  mode: Mode;
  closeOverlayMenu?: () => void;
}

interface CreateTabUnderlineProps {
  e: React.MouseEvent;
  ref: RefObject<Record<ROUTESKeys, HTMLParagraphElement | null>>;
}

const Nav = ({ id, mode }: NavProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabRef = useRef<Record<ROUTESKeys, HTMLParagraphElement | null>>({
    LOGO: null,
    THESKILLS: null,
    THEPROJECTS: null,
    CONTACT: null,
  });

  const createTabUnderline = ({ e, ref }: CreateTabUnderlineProps) => {
    const id = e.currentTarget.id as ROUTESKeys;
    const width = calculateRouteWidth({ id, ref });
    if (width) {
      setActiveTab(width);
    }
  };
  return (
    <>
      {id === "expand" ? (
        <>
          {Object.keys(ROUTES).map((tap, index) => {
            const __tab = tap as ROUTESKeys;

            return (
              <div key={__tab}>
                {index === 0 && <Logo mode={mode} styles="margin:1rem 0;" />}
                {index !== 0 && (
                  <ExpandText
                    ref={(el: HTMLParagraphElement | null) => {
                      tabRef.current[__tab] = el;
                    }}
                    onClick={() =>
                      handleNavigate({ routes: ROUTES, tap: __tab, navigate })
                    }
                    onMouseEnter={(e) => createTabUnderline({ e, ref: tabRef })}
                  >
                    {__tab}
                  </ExpandText>
                )}
              </div>
            );
          })}
        </>
      ) : (
        <>
          {Object.keys(ROUTES)
            .filter((route) => route !== "LOGO")
            .map((tab) => {
              const __tab = tab as ROUTESKeys;
              return (
                <OverlayText
                  ref={(el: HTMLParagraphElement | null) => {
                    tabRef.current[__tab] = el;
                  }}
                  $activeTab={activeTab}
                  key={__tab}
                  id={__tab}
                  onClick={() => {
                    handleNavigate({
                      routes: ROUTES,
                      tap: __tab,
                      navigate,
                    });
                  }}
                  onMouseEnter={(e) => createTabUnderline({ e, ref: tabRef })}
                >
                  {__tab}
                </OverlayText>
              );
            })}
        </>
      )}
    </>
  );
};

export default Nav;

const OverlayText = styled.p<{ $activeTab: number }>`
  color: white;
  font-size: clamp(2rem, 15vw, 8rem);
  margin: auto 0;
  width: fit-content;
  transform-origin: top;
  position: relative;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.lightCyan};
    transition: color 0.5s ease-in-out;
    &::after {
      width: ${(props) => props.$activeTab}px;
      background-color: ${(props) => props.theme.colors.lightCyan};
    }
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: white;
    transition: width 1s ease, background-color 1s ease;
  }
`;

const ExpandText = styled.p`
  color: white;
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: ${(props) => props.theme.fontSize.m};
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.lightCyan};
    transition: color 0.5s ease-in-out;
  }
`;
