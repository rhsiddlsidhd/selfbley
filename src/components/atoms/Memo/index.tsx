import React from "react";
import styled from "styled-components";

import { motion, TargetAndTransition, Transition } from "motion/react";
import useScreenStore, { Mode } from "../../../stores/screenStore";

interface MemoProps {
  children: React.ReactNode;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  transition?: Transition;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  $top?: number;
  $left?: number;
  style?: React.CSSProperties;
}

type Props = Omit<MemoProps, "children"> & { $mode: Mode };

const Memo = ({
  children,
  initial,
  animate,
  transition,
  $left,
  $top,
  onClick,
  onMouseEnter,
  onMouseLeave,
  style,
}: MemoProps) => {
  const mode = useScreenStore((state) => state.mode);
  return (
    <MemoBox
      style={{
        cursor: onClick || onMouseEnter || onMouseLeave ? "pointer" : "none",
        ...style,
      }}
      initial={initial}
      animate={animate}
      transition={transition}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      $mode={mode}
      $left={$left}
      $top={$top}
    >
      {children}
    </MemoBox>
  );
};

export default Memo;

const MemoBox = styled(motion.div)<Props>`
  ${({ theme, $mode }) =>
    $mode !== "desktop" ? theme.responseWidth(4) : theme.responseWidth(2)};

  font-size: ${({ theme }) => theme.FONT_SIZE.clamp7};
  position: absolute;
  display: flex;
  top: ${({ $top }) => `${$top}%`};
  left: ${({ $mode, $left }) =>
    $mode !== "desktop" ? `calc(100% / 6 * 1)` : `calc(100% / 6 * ${$left})`};
  word-break: keep-all;
  font-weight: bold;

  padding: 12px 18px;
  backdrop-filter: blur(20px);
  cursor: pointer;
  border-radius: 10px;
  box-shadow: "0 4px 10px rgba(0,0,0,0.3)";
`;
