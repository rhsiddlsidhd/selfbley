import { motion, useMotionValueEvent, useScroll } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Skills from "./Skills";
import { TechnologyKey } from "../../constants/skillsConstants";
import SkillItem from "../molecules/SkillItem";
import SkillList from "../molecules/SkillList";

const DynamicSkills: React.FC = () => {
  const skillsKeys: TechnologyKey[] = [
    "language",
    "frontend",
    "backend",
    "etc",
  ];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsSticky(latest > 0);
  });

  useEffect(() => {
    if (isSticky) {
      const id = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % skillsKeys.length);
      }, 3000);
      return () => clearInterval(id);
    }
  }, [isSticky]);

  const ITEM_HEIGHT = 120;

  useEffect(() => {
    console.log(activeIndex);
  }, [activeIndex]);

  return (
    <Container ref={containerRef}>
      <StickySection
        style={{ position: isSticky ? "sticky" : "static", top: 0 }}
      >
        {/* 컨텐츠 : skills 목록들을 grid 형태의 카드 형식으로 보여준다 */}
        {/* <Skills isSticky={isSticky} scroll={scrollYProgress} /> */}
        {/* 수정안: isSicky skills title들이 opacity로 나타난다. */}
        <Content
          animate={{
            width: isSticky ? "70%" : "100%",
            height: isSticky ? "70%" : "100%",
          }}
        >
          <Title>Overview</Title>
          <Roller>
            <RollerList
              animate={{ y: -activeIndex * ITEM_HEIGHT }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            >
              {skillsKeys.map((skill, i) => (
                <div
                  key={skill}
                  style={{
                    height: ITEM_HEIGHT,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    fontWeight: i === activeIndex ? "bold" : "normal",
                    opacity: i === activeIndex ? 1 : 0.5,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {skill}
                </div>
              ))}
            </RollerList>
          </Roller>
          {/* <ul>
            {skillsKeys.map((value, i) => {
              return <SkillList tab={value} key={i} />;
            })}
          </ul> */}
        </Content>
      </StickySection>
    </Container>
  );
};

export default DynamicSkills;

const RollerList = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const Roller = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div``;

const Content = styled(motion.div)`
  /* width: 80%; */
  /* height: 100%; */
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  & > ul {
    list-style: none;
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
  z-index: 21;
`;
