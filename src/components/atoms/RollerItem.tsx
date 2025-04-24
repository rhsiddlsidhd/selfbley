import { motion } from "motion/react";
import React from "react";
import { css, styled } from "styled-components";

interface RollerItemProps {
  isCenter: boolean;
  underlineWidth: number;
  idx: number;
  category: string;
  underlineRef: React.RefObject<(HTMLParagraphElement | null)[]>;
}

const RollerItem = ({
  isCenter,
  idx,
  category,
  underlineRef,
  underlineWidth,
}: RollerItemProps) => {
  return (
    <Container>
      <SkillFont
        $isCenter={isCenter}
        ref={(el) => {
          if (el) underlineRef.current[idx] = el;
        }}
        $width={underlineWidth}
      >
        {category}
      </SkillFont>
    </Container>
  );
};

export default RollerItem;

const Container = styled(motion.div)`
  height: calc(100% / 3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SkillFont = styled.p<{ $isCenter: boolean; $width: number }>`
  ${({ $isCenter, $width }) =>
    $isCenter &&
    css`
      position: relative;
      font-weight: bold;
      font-size: 2rem;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -0.5rem;
        height: 3px;
        background-color: white;
        width: ${$width}px;
        transition: width 0.4s ease;
      }
    `};
`;
