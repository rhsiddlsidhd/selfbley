import {
  MotionValue,
  motion,
  useMotionTemplate,
  useTransform,
} from "motion/react";

import { styled } from "styled-components";
import { technology } from "../../constants/skillsConstants";
import useScrollTemplatePctValue from "../../hooks/useScrollTemplatePctValue";

import SkillOverview from "./../molecules/SkillOverview";
import SkillsColumn from "../molecules/SkillsColumn";
import SkillsRow from "../molecules/SkillsRow";

type TechnologyKey = keyof typeof technology;

type StyleMap = {
  [key in TechnologyKey]: Record<string, MotionValue<string>>;
};

interface SkillsProps {
  isSticky: boolean;
  scroll: MotionValue<number>;
}

const Skills = ({ isSticky, scroll }: SkillsProps) => {
  // 스킬 컴포넌트
  // 해당 컴포넌트는 grid 형식의 구조의 형태를 가진다.

  const SkillKeys: TechnologyKey[] = ["lang", "fe", "be", "overview", "etc"];
  const techCategoryTabsColors: string[] = [
    "rgb(162, 123, 92)", //rgb(126, 221, 238)
    "rgb(44, 54, 57)", //rgb(250, 85, 30)
    "rgb(63, 78, 79)", //"rgb(180, 220, 25)"
    "rgb(0,0,0) ", //rgb(0, 97, 254)
    "rgb(220, 215, 201)", //rgb(255, 140, 25)
  ];

  // key 와 bgc 를 묶어서 하나로 관리

  const scrollScaleValue = useTransform(scroll, [0, 0.6], [2, 1]);

  const overViewScale = useMotionTemplate`${scrollScaleValue}`;
  // skill section 의 translate X / Y 의 이동 값
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
    lang: { x: langTranslateX },
    fe: { y: feTranslateY },
    be: { y: beTranslateY },
    overview: { scale: overViewScale },
    etc: { x: etcTranslateX },
  };

  const renderIcons = (tab: TechnologyKey) => {
    switch (tab) {
      case "overview": {
        const section = technology[tab];
        return <SkillOverview {...{ isSticky, section }} />;
      }

      case "be":
      case "fe": {
        const section = technology[tab];
        return section.items.map(({ name, icon }, _, arr) => (
          <SkillsColumn total={arr.length} {...{ name, icon }} />
        ));
      }

      case "etc":
      case "lang": {
        const section = technology[tab];
        return section.items.map(({ name, icon }, _, arr) => (
          <SkillsRow total={arr.length} {...{ name, icon }} />
        ));
      }
    }
  };

  return (
    //
    <ContentWrapper
      animate={{
        width: isSticky ? "75%" : "100%",
        height: isSticky ? "75%" : "100%",
      }}
    >
      {SkillKeys.map((tab, i) => {
        const style = styleMap[tab];
        const colors = techCategoryTabsColors[i];
        return (
          <SkillArea
            key={i}
            $name={tab}
            $colors={colors}
            $isSticky={isSticky}
            style={style}
            animate={{
              backgroundColor: isSticky ? colors : "rgba(0, 0, 0, 0)",
            }}
          >
            {renderIcons(tab)}
          </SkillArea>
        );
      })}
    </ContentWrapper>
  );
};

export default Skills;

const ContentWrapper = styled(motion.div)`
  display: grid;

  grid-template-areas:
    "lang lang fe "
    "be overview fe"
    "be etc etc";
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.5rem;
`;

const SkillArea = styled(motion.div)<{
  $name: TechnologyKey;
  $colors: string;
  $isSticky: boolean;
}>`
  height: 100%;
  grid-area: ${({ $name }) => $name};
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  border-radius: 1rem;
`;
