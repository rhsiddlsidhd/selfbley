import React, { RefObject, useRef, useState } from "react";

import Logo from "./Logo";
import styled from "styled-components";

import { useNavigate } from "react-router";

import useScreenStore from "../../stores/useScreenStore";
import { ROUTES } from "../../constants/routes";
import { ROUTESKeys } from "../../types/routes";
import { handleNavigate } from "../../utils/navigation";
import { calculatetabWidth } from "../../utils/calculation";

interface CreateTabUnderlineProps {
  e: React.MouseEvent;
  ref: RefObject<Record<ROUTESKeys, HTMLParagraphElement | null>>;
}

const Nav = () => {
  const mode = useScreenStore((state) => state.mode);
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

    const width = calculatetabWidth({ id, ref });
    if (width) {
      setActiveTab(width);
    }
  };
  return (
    <>
      {mode !== "mobile" ? (
        <>
          {Object.keys(ROUTES).map((tab, index) => {
            const __tab = tab as ROUTESKeys;
            return (
              <div key={__tab}>
                {index === 0 && <Logo styles="margin:1rem 0;" />}
                {index !== 0 && (
                  <ExpandText
                    $activeTab={activeTab}
                    id={__tab}
                    ref={(el: HTMLParagraphElement | null) => {
                      tabRef.current[__tab] = el;
                    }}
                    onClick={() =>
                      handleNavigate({ routes: ROUTES, tab: __tab, navigate })
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
                    setTimeout(() => {
                      handleNavigate({
                        routes: ROUTES,
                        tab: __tab,
                        navigate,
                      });
                    }, 900);
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
  height: fit-content;
  width: fit-content;
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

const ExpandText = styled.p<{ $activeTab: number }>`
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: ${(props) => props.theme.fontSize.m};
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
    bottom: -0.2rem;
    left: 0;
    width: 0;
    height: 2px;
    background-color: white;
    transition: width 1s ease, background-color 1s ease;
  }
`;
