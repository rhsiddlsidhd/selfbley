import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import html from "../../assets/html.svg";

const InteractiveScale: React.FC = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const skillTabs = ["lang", "fe", "be", "overview", "etc"];

  const n = useTransform(scrollYProgress, [0, 0.3], [200, 0]);
  const pos = useMotionTemplate`${n}%`;
  const neg = useMotionTemplate`-${n}%`;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsSticky(latest > 0);
  });

  return (
    <Container ref={containerRef}>
      <HexagonWrapper
        style={{ position: isSticky ? "sticky" : "static", top: 0 }}
      >
        <Hexagon
          animate={{
            width: isSticky ? "75%" : "100%",
            height: isSticky ? "75%" : "100%",
          }}
          transition={{ duration: 0.6 }}
        >
          <SkillBox style={{ x: neg }} className="lang">
            {Array.from({ length: 8 }, (_, i) => {
              return (
                <RowBox>
                  <img src={html} key={i} />
                </RowBox>
              );
            })}
          </SkillBox>
          <SkillBox style={{ y: neg }} className="fe">
            {Array.from({ length: 8 }, (_, i) => {
              return (
                <ColumnBox>
                  <img src={html} key={i} />
                </ColumnBox>
              );
            })}
          </SkillBox>
          <SkillBox style={{ y: pos }} className="be">
            {Array.from({ length: 8 }, (_, i) => {
              return (
                <ColumnBox>
                  <img src={html} key={i} />
                </ColumnBox>
              );
            })}
          </SkillBox>
          <SkillBox
            animate={{ scale: isSticky ? 1 : 2 }}
            transition={{ duration: 0.6 }}
            className="overview"
          >
            <h1>hi</h1>
          </SkillBox>
          <SkillBox style={{ x: pos }} className="etc">
            {Array.from({ length: 8 }, (_, i) => {
              return (
                <RowBox>
                  <img src={html} key={i} />
                </RowBox>
              );
            })}
          </SkillBox>
        </Hexagon>
      </HexagonWrapper>
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

const HexagonWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Hexagon = styled(motion.div)`
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
    display: flex;
    flex-wrap: wrap;
  }
  .be {
    grid-area: be;
    background-color: #618361;
    display: flex;
    flex-wrap: wrap;
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

const SkillBox = styled(motion.div)`
  display: flex;
  /* justify-content: center; */ //overview
  /* align-items: center; */ //overview
  flex-wrap: wrap;

  & > div {
    border: 3px solid gray;
    overflow: hidden;
    & > img {
    }
  }
`;

const RowBox = styled(motion.div)`
  width: calc(100% / 2); //mode mobile 2 tablet 3 desktop 4
`;
const ColumnBox = styled(motion.div)`
  width: calc(100% / 1); //mode mobile 1 tablet 2 desktop 2
`;
