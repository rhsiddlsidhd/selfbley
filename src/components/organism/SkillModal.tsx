import { motion } from "motion/react";
import React, { useMemo } from "react";
import styled from "styled-components";
import { technology } from "../../constants/skillsConstants";
import { BadgeTypes } from "../atoms/Badge";
import Badges from "../molecules/Badges";

const SkillModal = ({
  isModal,
  contentWidth,
}: {
  isModal: boolean;
  contentWidth: string;
}) => {
  const data = useMemo(
    () =>
      Object.entries(technology).map(([category, items]) => ({
        category: category as BadgeTypes,
        techList: items.map((item) => item.name),
      })),
    []
  );

  return (
    <Container
      animate={{ y: isModal ? "-50%" : "150%" }}
      style={{ width: contentWidth, x: "-50%" }}
    >
      {data.map(({ category, techList }, i) => {
        return (
          <div key={i}>
            <h6 style={{ color: "black" }}>{category.toUpperCase()}</h6>
            <Badges category={category} techList={techList} key={i} />
          </div>
        );
      })}
    </Container>
  );
};

export default SkillModal;

const Container = styled(motion.div)`
  height: 70vh;
  background-color: #ffd34f;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  & > div {
    flex: 1 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
