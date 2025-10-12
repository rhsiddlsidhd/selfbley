import React from "react";
import styled from "styled-components";
import useScreenStore, { Mode } from "../../../stores/useScreenStore";
import { motion, TargetAndTransition, Transition } from "motion/react";

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
  position: absolute;
  display: flex;
  top: ${({ $top }) => `${$top}%`};
  left: ${({ $mode, $left }) =>
    $mode !== "desktop" ? `calc(100% / 6 * 1)` : `calc(100% / 6 * ${$left})`};
  width: ${({ $mode }) =>
    $mode !== "desktop" ? `calc(100% / 6 * 4)` : `calc(100% / 6 * 2)`};
  word-break: keep-all;
  font-weight: bold;
  font-size: clamp(0.75rem, 2vw, 3rem);
  padding: 12px 18px;
  backdrop-filter: blur(20px);
  cursor: pointer;
  z-index: 99;
  border-radius: 10px;
  box-shadow: "0 4px 10px rgba(0,0,0,0.3)";
`;
