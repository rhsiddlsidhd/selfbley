import {
  MotionValue,
  motion,
  useMotionTemplate,
  useTransform,
} from "motion/react";

import { styled } from "styled-components";
import { TechnologyKey, skillAreas } from "../../constants/skillsConstants";
import useScrollTemplatePctValue from "../../hooks/useScrollTemplatePctValue";
import SkillItem from "../molecules/SkillItem";

type StyleMap = {
  [key in TechnologyKey]: Record<string, MotionValue<string>>;
};

interface SkillsProps {
  isSticky: boolean;
  scroll: MotionValue<number>;
}

const Skills = ({ isSticky, scroll }: SkillsProps) => {
  const scrollScaleValue = useTransform(scroll, [0, 0.6], [2, 1]);
  const overViewScale = useMotionTemplate`${scrollScaleValue}`;
  const langTranslateX = useScrollTemplatePctValue({
    scroll: scroll,
    input: [0, 0.15],
    output: [100, 0],
    reverse: true,
  });

  const feTranslateY = useScrollTemplatePctValue({
    scroll: scroll,
    input: [0.15, 0.3],
    output: [100, 0],
    reverse: true,
  });
  const beTranslateY = useScrollTemplatePctValue({
    scroll: scroll,
    input: [0.3, 0.45],
    output: [100, 0],
    reverse: false,
  });
  const etcTranslateX = useScrollTemplatePctValue({
    scroll: scroll,
    input: [0.45, 0.6],
    output: [100, 0],
    reverse: false,
  });

  const styleMap: StyleMap = {
    language: { x: langTranslateX },
    frontend: { y: feTranslateY },
    backend: { y: beTranslateY },
    overview: { scale: overViewScale },
    etc: { x: etcTranslateX },
  };

  return (
    <Container
      animate={{
        width: isSticky ? "75%" : "100%",
        height: isSticky ? "75%" : "100%",
      }}
    >
      {skillAreas.map(({ key: tab, color }) => {
        const style = styleMap[tab];
        return (
          <SkillArea
            key={tab}
            $name={tab}
            style={style}
            animate={{
              backgroundColor: isSticky ? color : "rgba(0, 0, 0, 0)",
              color: isSticky ? "#EA1821" : "rgb(255, 255, 255)",
            }}
          >
            <SkillItem tab={tab} />
          </SkillArea>
        );
      })}
    </Container>
  );
};

export default Skills;

const Container = styled(motion.div)`
  display: grid;
  grid-template-areas:
    "language language frontend"
    "backend overview frontend"
    "backend etc etc";
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.5rem;
`;

const SkillArea = styled(motion.div)<{
  $name: TechnologyKey;
}>`
  height: 100%;
  grid-area: ${({ $name }) => $name};
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  border-radius: 1rem;
`;
