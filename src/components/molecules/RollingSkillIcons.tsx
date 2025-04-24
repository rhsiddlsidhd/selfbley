import React, { useEffect, useMemo } from "react";
import { SkillIcons } from "../organism/SkillContent";
import styled from "styled-components";
import { motion } from "motion/react";
import { skillsKeys, technology } from "../../constants/skillsConstants";

const RollingSkillIcons = ({ isHover }: { isHover: boolean }) => {
  const skills = useMemo(() => {
    console.log(
      Object.entries(technology)
        .filter(([key]) => key !== "overview")
        .map(([, items]) => items)
    );
  }, []);

  return (
    <IconsBoxContainer>
      <IconWrapper
        initial={{ y: "100%" }}
        animate={{ y: isHover ? "0" : "100%" }}
      >
        {/* {skills.map(({ icon, name }) => {
          return (
            <div key={name}>
              <img src={icon} alt="아이콘" />
            </div>
          );
        })} */}
      </IconWrapper>
    </IconsBoxContainer>
  );
};

export default RollingSkillIcons;

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
