import {
  MotionValue,
  motion,
  useMotionTemplate,
  useTransform,
} from "motion/react";
import React from "react";
import { styled } from "styled-components";
import { technology } from "../../constants/skillsConstants";
import useScrollTemplatePctValue from "../../hooks/useScrollTemplatePctValue";
import Icon from "../atoms/Icon";

type TechnologyKey = keyof typeof technology;

type StyleMap = {
  [key in TechnologyKey]: Record<string, MotionValue<string>>;
};

interface SkillsProps {
  isSticky: boolean;
  scroll: MotionValue<number>;
  responseiveRowItemCount: number;
  responseiveColItemCount: number;
}

const Skills = ({
  isSticky,
  scroll,
  responseiveRowItemCount,
  responseiveColItemCount,
}: SkillsProps) => {
  // 스킬 컴포넌트
  // 해당 컴포넌트는 grid 형식의 구조의 형태를 가진다.

  const technologyTabs: TechnologyKey[] = [
    "lang",
    "fe",
    "be",
    "overview",
    "etc",
  ];
  const techCategoryTabsColors: string[] = [
    "rgb(162, 123, 92)", //rgb(126, 221, 238)
    "rgb(44, 54, 57)", //rgb(250, 85, 30)
    "rgb(63, 78, 79)", //"rgb(180, 220, 25)"
    "rgb(0,0,0) ", //rgb(0, 97, 254)
    "rgb(220, 215, 201)", //rgb(255, 140, 25)
  ];

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

  const renderTechnology = (tab: TechnologyKey) => {
    const layout = tab === "fe" || tab === "be" ? "col" : "row";
    const section = technology[tab];

    if ("description" in section) {
      return (
        <Overview
          $isSticky={isSticky}
          animate={{
            color: isSticky ? "#EA1821" : "rgb(255, 255, 255)",
          }}
        >
          <p>overview</p>
          <p>{section.description}</p>
        </Overview>
      );
    } else {
      return layout === "col"
        ? section.items.map(({ name, icon }, _, arr) => {
            return (
              <TechnologyCol
                key={name}
                $itemsPerCol={responseiveColItemCount}
                $totalItems={arr.length}
              >
                <Icon source={icon} style={{ width: "95%", height: "90%" }} />
              </TechnologyCol>
            );
          })
        : section.items.map(({ name, icon }, _, arr) => {
            return (
              <TechnologyRow
                key={name}
                $itemsPerRow={responseiveRowItemCount}
                $totalItems={arr.length}
              >
                <Icon source={icon} style={{ width: "95%", height: "90%" }} />
              </TechnologyRow>
            );
          });
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
      {technologyTabs.map((tab, i) => {
        const style = styleMap[tab];
        //우선 tab에서 overview 만 따로 걸러주고
        //이후에 tab에 따라 layout = string을 추가하고 return 던져줌
        const colors = techCategoryTabsColors[i];
        return (
          <TechCategoryBox
            key={i}
            $name={tab}
            $colors={colors}
            $isSticky={isSticky}
            style={style}
            animate={{
              backgroundColor: isSticky ? colors : "rgba(0, 0, 0, 0)",
            }}
          >
            {renderTechnology(tab)}
          </TechCategoryBox>
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

const TechCategoryBox = styled(motion.div)<{
  $name: TechnologyKey;
  $colors: string;
  $isSticky: boolean;
}>`
  height: 100%;
  grid-area: ${({ $name }) => $name};

  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  /* border: 1px solid #7178852b; */
  border-radius: 1rem;
`;

const TechnologyRow = styled(motion.div)<{
  $itemsPerRow: number;
  $totalItems: number;
}>`
  //mode mobile 2 tablet 3 desktop 4
  flex: ${({ $itemsPerRow }) => `0 0 calc(100% / ${$itemsPerRow})`};
  height: ${({ $itemsPerRow, $totalItems }) => {
    const rowCount = Math.ceil($totalItems / $itemsPerRow);
    return `calc(100% / ${rowCount})`;
  }}; //  총 item의 개수 / row 아이템의 수
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TechnologyCol = styled(motion.div)<{
  $itemsPerCol: number;
  $totalItems: number;
}>`
  // width: calc(100% / 1); //mode mobile 1 tablet 2 desktop 2
  flex: ${({ $itemsPerCol }) => `0 0 calc(100% / ${$itemsPerCol})`};
  height: ${({ $itemsPerCol, $totalItems }) => {
    const colCount = Math.ceil($totalItems / $itemsPerCol);
    return `calc(100% / ${colCount})`;
  }};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled(motion.div)<{ $isSticky: boolean }>`
  position: relative;
  font-size: clamp(0.25rem, 2vw, 1rem);
  font-weight: bold;
  padding: 1rem 0 0 1rem;
  & > p {
    color: inherit;
  }
`;
