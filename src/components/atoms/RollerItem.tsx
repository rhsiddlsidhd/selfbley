import { motion } from "motion/react";
import React, { SetStateAction, useEffect, useState } from "react";
import { css, styled } from "styled-components";
import { technology } from "../../constants/skillsConstants";
import { SkillIcons } from "../organism/SkillContent";
interface RollerItemProps {
  setFilterIcons: React.Dispatch<SetStateAction<SkillIcons[]>>;
  setIsHover: React.Dispatch<SetStateAction<boolean>>;
  stopAutoPlay: () => void;
  startAutoPlay: () => void;
  centerIndex: number;
  id: string;
  idx: number;
  skill: string;
  underlineRef: React.RefObject<(HTMLParagraphElement | null)[]>;
}

const RollerItem = ({
  setFilterIcons,
  setIsHover,
  startAutoPlay,
  stopAutoPlay,
  centerIndex,
  id,
  idx,
  skill,
  underlineRef,
}: RollerItemProps) => {
  const [underLineWidth, setUnderLineWidth] = useState<number>(0);

  useEffect(() => {
    console.log(underlineRef);
  }, [underlineRef]);

  const createIcons = (id) => {
    setFilterIcons(technology[id].items);
  };

  const createUnderline = (centerIndex: number) => {
    const el = underlineRef.current[centerIndex];
    if (el) {
      const width = el.offsetWidth;
      setUnderLineWidth(width);
    }
  };

  const handleHoverStart = (id, centerIndex) => {
    setIsHover(true);
    createUnderline(centerIndex);
    createIcons(id);

    stopAutoPlay();
  };

  const handleHoverleave = (id) => {
    startAutoPlay();
    setIsHover(false);
    setUnderLineWidth(0);
  };
  return (
    <Container
      onHoverStart={() => handleHoverStart(id, centerIndex)}
      onHoverEnd={() => handleHoverleave(id)}
    >
      <SkillFont
        $center={idx === centerIndex}
        ref={(el) => {
          if (el) underlineRef.current[idx] = el;
        }}
        $width={underLineWidth}
      >
        {skill}
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

const SkillFont = styled(motion.p)<{ $center: boolean; $width: number }>`
  ${({ $center, $width }) =>
    $center &&
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
