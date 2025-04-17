import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import html from "../../assets/html.svg";
import useScreenStore from "../../stores/useScreenStore";
import Icon from "../atoms/Icon";
import { technology } from "./../../constants/skillsConstants";

type TechnologyKey = keyof typeof technology;

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

  const n = useTransform(scrollYProgress, [0, 0.3], [200, 0]);
  const pos = useMotionTemplate`${n}%`;
  const neg = useMotionTemplate`-${n}%`;

  const styleMap: Record<string, any> = {
    lang: { x: neg },
    fe: { y: neg },
    be: { y: pos },
    overview: { scale: isSticky ? 1 : 2 },
    etc: { x: pos },
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsSticky(latest > 0);
  });

  const renderTechnology = (tab: TechnologyKey) => {
    const layout = tab === "fe" || tab === "be" ? "col" : "row";
    const section = technology[tab];

    if ("description" in section) {
      return <div>{section.description}</div>;
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
        <ContentWrapper
          animate={{
            width: isSticky ? "75%" : "100%",
            height: isSticky ? "75%" : "100%",
          }}
          transition={{ duration: 0.6 }}
        >
          {technologyTabs.map((tab, i) => {
            const style = styleMap[tab];
            //우선 tab에서 overview 만 따로 걸러주고
            //이후에 tab에 따라 layout = string을 추가하고 return 던져줌

            return (
              <TechCategoryBox key={i} className={tab} style={style}>
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

const Container = styled.section`
  position: relative;
  width: 100vw;
  height: 200vh;
  background-color: #dfdede;
`;

const StickySection = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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
  .lang {
    grid-area: lang;
    background-color: #a56666;
  }
  .fe {
    grid-area: fe;
    background-color: #444477;
  }
  .be {
    grid-area: be;
    background-color: #618361;
  }
  .overview {
    grid-area: overview;
    background-color: #adada7;
  }
  .etc {
    grid-area: etc;
    background-color: purple;
  }
`;

const TechCategoryBox = styled(motion.div)`
  display: flex;
  height: 100%;
  overflow: auto;
  flex-wrap: wrap;
  /* justify-content: center; */ //overview
  /* align-items: center; */ //overview
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
  /* height: calc(
    100% / 8
  );  */

  height: ${({ $totalItems }) =>
    `calc(100% / ${$totalItems})`}; // 총 item의 개수를 나눠서 각 아이템의 고유의 height를 가져가야함
  height: ${({ $itemsPerCol, $totalItems }) => {
    const colCount = Math.ceil($totalItems / $itemsPerCol);
    return `calc(100% / ${colCount})`;
  }};
  display: flex;
  justify-content: center;
  align-items: center;
`;
