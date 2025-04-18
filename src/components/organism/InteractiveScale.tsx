import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useScreenStore from "../../stores/useScreenStore";
import Icon from "../atoms/Icon";
import { technology } from "./../../constants/skillsConstants";
import frontFlaticon from "./../../assets/frontFlaticon.png";

type TechnologyKey = keyof typeof technology;
type StyleMap = {
  [key in TechnologyKey]: Record<string, MotionValue<string>>;
};

const InteractiveScale: React.FC = () => {
  const mode = useScreenStore((state) => state.mode);
  const [responseiveRowItemCount, setResponseRowItemCount] =
    useState<number>(0);
  const [responseiveColItemCount, setResponseiveColItemCount] =
    useState<number>(0);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const technologyTabs: TechnologyKey[] = [
    "lang",
    "fe",
    "be",
    "overview",
    "etc",
  ];
  const techCategoryTabsColors: string[] = [
    "#A27B5C", //rgb(126, 221, 238)
    "#2C3639", //rgb(250, 85, 30)
    "#3F4E4F", //"rgb(180, 220, 25)"
    "black ", //rgb(0, 97, 254)
    "#DCD7C9", //rgb(255, 140, 25)
  ];

  const s = useTransform(scrollYProgress, [0, 0.25], [2, 1]);
  const n = useTransform(scrollYProgress, [0, 0.15], [100, 0]);
  const pos = useMotionTemplate`${n}%`;
  const neg = useMotionTemplate`-${n}%`;
  const scale = useMotionTemplate`${s}`;

  const styleMap: StyleMap = {
    lang: { x: neg },
    fe: { y: neg },
    be: { y: pos },
    overview: { scale },
    etc: { x: pos },
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsSticky(latest > 0);
  });

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

  useEffect(() => {
    const rowCount = mode === "mobile" ? 1 : mode === "tablet" ? 2 : 3;
    const colCount = mode !== "desktop" ? 1 : 2;
    setResponseRowItemCount((prev) => (prev !== rowCount ? rowCount : prev));
    setResponseiveColItemCount((prev) => (prev !== colCount ? colCount : prev));
  }, [mode]);
  return (
    <Container ref={containerRef}>
      <StickySection
        style={{ position: isSticky ? "sticky" : "static", top: 0 }}
      >
        {/* <Background $length={isSticky ? 10 : 20}>
          {Array.from({ length: 10 }, (_, i) => {
            return <div key={i} />;
          })}
        </Background> */}
        <ContentWrapper
          animate={{
            width: isSticky ? "80%" : "100%",
            height: isSticky ? "80%" : "100%",
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
      </StickySection>
    </Container>
  );
};

export default InteractiveScale;

const Background = styled.div<{ $length: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  & > div {
    width: 100%;
    height: ${({ $length }) => `calc(100% / ${$length})`};
    border-bottom: 2px solid #7178852b;
  }
`;

const Container = styled.section`
  position: relative;
  width: 100vw;
  height: 300vh;
  background-color: black;
`;

const StickySection = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 11;
`;

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
