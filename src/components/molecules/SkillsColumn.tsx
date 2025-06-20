import { motion } from "motion/react";
import Icon from "../atoms/Icon";
import { styled } from "styled-components";
import useScreenStore from "../../stores/useScreenStore";

interface SkillsColumn {
  name: string;
  total: number;
  icon: string;
}

const SkillsColumn = ({
  name,

  total,
  icon,
}: SkillsColumn) => {
  const mode = useScreenStore((state) => state.mode);
  const colItemLimit = mode !== "desktop" ? 1 : 2;
  return (
    <TechnologyCol key={name} $itemLimit={colItemLimit} $totalItems={total}>
      <Icon source={icon} style={{ width: "95%", height: "90%" }} />
    </TechnologyCol>
  );
};

export default SkillsColumn;

const TechnologyCol = styled(motion.div)<{
  $itemLimit: number;
  $totalItems: number;
}>`
  // width: calc(100% / 1); //mode mobile 1 tablet 2 desktop 2
  flex: ${({ $itemLimit }) => `0 0 calc(100% / ${$itemLimit})`};
  height: ${({ $itemLimit, $totalItems }) => {
    const colCount = Math.ceil($totalItems / $itemLimit);
    return `calc(100% / ${colCount})`;
  }};
  display: flex;
  justify-content: center;
  align-items: center;
`;
