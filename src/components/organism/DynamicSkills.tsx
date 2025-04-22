import { motion, useMotionValueEvent, useScroll } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import discord from "../../assets/discord.svg";

import { technology, TechnologyKey } from "../../constants/skillsConstants";
import { style } from "motion/react-client";
import { easeInOut } from "motion";

interface SkillIcons {
  name: string;
  icon: string;
}

const DynamicSkills: React.FC = () => {
  const skillsKeys: TechnologyKey[] = [
    "language",
    "frontend",
    "backend",
    "etc",
  ];

  const marqueeSkillsKeys = [...skillsKeys, ...skillsKeys];
  const [isHover, setIsHover] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const underlineRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [underLineWidth, setUnderLineWidth] = useState<number>(0);
  const [filterIcons, setFilterIcons] = useState<SkillIcons[]>([]);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // setIsSticky(latest > 0 );
    setIsSticky(latest > 0 && latest < 1);
  });

  useEffect(() => {
    if (isSticky) {
      startAutoPlay();
    }
    return () => {
      stopAutoPlay();
    };
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

  const VISIBLE_COUNT = 3;
  const centerOffset = Math.floor(VISIBLE_COUNT / 2);

  const startAutoPlay = () => {
    if (intervalRef.current) return; // 이미 실행 중이면 무시
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
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
    <Container ref={containerRef}>
      <StickySection
        style={{ position: isSticky ? "sticky" : "static", top: 0 }}
      >
        {/* 컨텐츠 : skills 목록들을 grid 형태의 카드 형식으로 보여준다 */}
        {/* <Skills isSticky={isSticky} scroll={scrollYProgress} /> */}
        {/* 수정안: isSicky skills title들이 opacity로 나타난다. */}
        <ContentWrapper
          animate={{
            width: isSticky ? "calc(100% / 6 *  4)" : "100%", //mobile 에서는 4개 그외 2개
            height: isSticky ? "50%" : "100%",
          }}
        >
          <Title>
            {!isSticky && <p>{technology["overview"].description}</p>}
          </Title>
          <Content animate={{ opacity: isSticky ? 1 : 0 }}>
            {/* 마키와 같은 원리   */}
            {/* active 아이템을 center에 위치시키기 위한 방법 */}
            {/*  */}
            <Roller
              animate={{ y: `-${activeIndex * (100 / 3)}%` }}
              transition={
                isTransitioning
                  ? { duration: 0.6, ease: "easeInOut" }
                  : { duration: 0 }
              }
            >
              {marqueeSkillsKeys.map((skill, i, arr) => {
                const centerIndex = activeIndex + centerOffset;
                const id = arr[centerIndex];

                return (
                  <RollerItem
                    key={`${skill}-${i}`}
                    onHoverStart={() => handleHoverStart(id, centerIndex)}
                    onHoverEnd={() => handleHoverleave(id)}
                  >
                    <SkillFont
                      $center={i === centerIndex}
                      ref={(el) => {
                        underlineRef.current[i] = el;
                      }}
                      $width={underLineWidth}
                    >
                      {skill}
                    </SkillFont>
                  </RollerItem>
                );
              })}
            </Roller>
          </Content>
        </ContentWrapper>
        <IconsBoxContainer>
          <IconWrapper
            initial={{ y: "100%" }}
            animate={{ y: isHover ? "0" : "100%" }}
          >
            {filterIcons.map(({ icon }, i) => {
              return (
                <div key={i}>
                  <img src={icon} alt="아이콘" />
                </div>
              );
            })}
          </IconWrapper>
        </IconsBoxContainer>
      </StickySection>
    </Container>
  );
};

export default DynamicSkills;
const IconsBoxContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: -1;
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  justify-content: end;
  gap: 1rem;
  flex-wrap: wrap;
  width: calc(5rem * 5 + 1rem * 4);
  border-top-left-radius: 10px;

  & > div {
    flex: 0 0 5rem; // mobile 3  gap 0.5  else 5 gap 1
    aspect-ratio: 1 / 1;
    background-color: white;
    border-radius: 10px;
    padding: 0.5rem;

    & > img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
`;

const Content = styled(motion.div)`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const RollerItem = styled(motion.div)`
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

const Roller = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Title = styled.div``;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Container = styled.section`
  position: relative;
  width: 100vw;
  height: 200vh;
  background-color: black;
`;

const StickySection = styled.div`
  height: 100vh;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 21;
`;
