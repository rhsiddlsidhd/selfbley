import { motion } from "motion/react";
import React, { useState } from "react";
import { styled } from "styled-components";
import { technology } from "../../constants/skillsConstants";
import RollingSkillList from "../molecules/RollingSkillList";
interface SkillContentProps {
  isSticky: boolean;
}

export interface SkillIcons {
  name: string;
  icon: string;
}

const SkillContent = ({ isSticky }: SkillContentProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [filterIcons, setFilterIcons] = useState<SkillIcons[]>([]);

  /**
   * Skill Content
   * Overview , SkillList => RollingSkillList
   */

  return (
    <>
      <ContentWrapper
        animate={{
          width: isSticky ? "calc(100% / 6 *  4)" : "100%", //mobile 에서는 4개 그외 2개
          height: isSticky ? "50%" : "100%",
        }}
      >
        <Title>
          {!isSticky && <p>{technology["overview"].description}</p>}
        </Title>
        <RollingSkillList
          isSticky={isSticky}
          setFilterIcons={setFilterIcons}
          setIsHover={setIsHover}
        />
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
    </>
  );
};

export default SkillContent;

const Title = styled.div``;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

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
