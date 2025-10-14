import { motion } from "motion/react";
import { useMemo } from "react";
import styled from "styled-components";
import {
  VERTICAL_COUNT_2,
  VERTICAL_COUNT_4,
  VERTICAL_TOTAL_LINE,
} from "../../constants/skillsConstants";
import { BadgeTypes } from "../atoms/Badge";
import Badges from "../molecules/Badges";
import useScreenStore from "../../stores/useScreenStore";
import { technologys } from "./content/TechnologiesContent/constant";

const SkillModal = () => {
  const mode = useScreenStore((state) => state.mode);
  const data = useMemo(
    () =>
      Object.entries(technologys).map(([category, techs]) => ({
        category: category as BadgeTypes,
        techList: techs.map((tech) => tech),
      })),
    []
  );

  return (
    <Container
      $total={VERTICAL_TOTAL_LINE}
      $count={mode === "mobile" ? VERTICAL_COUNT_4 : VERTICAL_COUNT_2}
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

const Container = styled(motion.div)<{ $total: number; $count: number }>`
  width: ${({ $count, $total }) => `calc(100% / ${$total} * ${$count})`};
  min-height: 50vh;
  background-color: #ffd34f;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
