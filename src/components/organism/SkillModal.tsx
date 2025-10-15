import { motion } from "motion/react";
import { useMemo } from "react";
import styled from "styled-components";
import Badges from "../molecules/Badges";
import useScreenStore, { Mode } from "../../stores/useScreenStore";
import {
  TechnologyKeys,
  technologys,
} from "./content/TechnologiesContent/constant";

const SkillModal = () => {
  const mode = useScreenStore((state) => state.mode);
  const data = useMemo(
    () =>
      Object.entries(technologys).map(([category, techs]) => ({
        category: category as TechnologyKeys,
        techList: techs.map((tech) => tech),
      })),
    []
  );

  return (
    <Container $mode={mode}>
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

const Container = styled(motion.div)<{ $mode: Mode }>`
  ${({ theme, $mode }) =>
    $mode !== "mobile" ? theme.responseWidth(2) : theme.responseWidth(4)}
  min-height: 50vh;
  background-color: ${({ theme }) => theme.COLORS.yellow};
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
