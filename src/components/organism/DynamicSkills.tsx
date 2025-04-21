import { motion, useMotionValueEvent, useScroll } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Skills from "./Skills";
import { TechnologyKey } from "../../constants/skillsConstants";

const DynamicSkills: React.FC = () => {
  const skillsKeys: TechnologyKey[] = [
    "language",
    "frontend",
    "backend",
    "etc",
  ];

  const marqueeSkillsKeys = [...skillsKeys, ...skillsKeys];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
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
        setActiveIndex((prev) => prev + 1);
      }, 3000);
      return () => clearInterval(id);
    }
  }, [isSticky]);

  useEffect(() => {
    if (activeIndex === skillsKeys.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(0);
      }, 600);

      setTimeout(() => {
        setIsTransitioning(true);
      }, 700);
    }
  }, [activeIndex, skillsKeys.length]);

  useEffect(() => {
    console.log(activeIndex);
  }, [activeIndex]);

  const VISIBLE_COUNT = 3;
  const centerOffset = Math.floor(VISIBLE_COUNT / 2);

  return (
    <Container ref={containerRef}>
      <StickySection
        style={{ position: isSticky ? "sticky" : "static", top: 0 }}
      >
        {/* 컨텐츠 : skills 목록들을 grid 형태의 카드 형식으로 보여준다 */}
        {/* <Skills isSticky={isSticky} scroll={scrollYProgress} /> */}
        {/* 수정안: isSicky skills title들이 opacity로 나타난다. */}
        <ContentWrapper
          animate={{
            width: isSticky ? "calc(100% / 6 *  4)" : "100%",
            height: isSticky ? "50%" : "100%",
          }}
        >
          <Title>
            <p>overview</p>
          </Title>
          <Content animate={{ opacity: isSticky ? 1 : 0 }}>
            {/* 마키와 같은 원리   */}
            {/* active 아이템을 center에 위치시키기 위한 방법 */}
            {/*  */}
            <Roller>
              {marqueeSkillsKeys.map((v, i) => {
                const centerIndex = activeIndex + centerOffset;
                console.log(centerIndex);
                return (
                  <RollerItem
                    animate={{ y: `-${activeIndex * 100}%` }}
                    transition={
                      isTransitioning
                        ? { duration: 0.6, ease: "easeInOut" }
                        : { duration: 0 }
                    }
                    style={{
                      fontWeight: i === centerIndex ? "bold" : "normal",
                    }}
                  >
                    {v}
                  </RollerItem>
                );
              })}
            </Roller>
          </Content>
        </ContentWrapper>
      </StickySection>
    </Container>
  );
};

export default DynamicSkills;
const Content = styled(motion.div)`
  flex: 1 0 auto;
  background-color: blue;
  display: flex;
  align-items: center;
`;

const RollerItem = styled(motion.div)`
  height: calc(100% / 3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Roller = styled(motion.div)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Title = styled.div``;

const ContentWrapper = styled(motion.div)`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
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
