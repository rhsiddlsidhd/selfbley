import { motion } from "motion/react";
import { styled } from "styled-components";
import Icon from "../atoms/Icon";
import useScreenStore from "../../stores/useScreenStore";
interface SkillsRowProps {
  name: string;
  total: number;
  icon: string;
}

const SkillsRow = ({ name, total, icon }: SkillsRowProps) => {
  const mode = useScreenStore((state) => state.mode);
  //row의 최대 item의 개수
  const rowItemLimit = mode === "mobile" ? 1 : mode === "tablet" ? 2 : 3;

  return (
    <TechnologyRow key={name} $itemLimit={rowItemLimit} $totalItems={total}>
      <Icon source={icon} style={{ width: "95%", height: "90%" }} />
    </TechnologyRow>
  );
};

export default SkillsRow;

const TechnologyRow = styled(motion.div)<{
  $itemLimit: number;
  $totalItems: number;
}>`
  //mode mobile 2 tablet 3 desktop 4
  flex: ${({ $itemLimit }) => `0 0 calc(100% / ${$itemLimit})`};
  height: ${({ $itemLimit, $totalItems }) => {
    const rowCount = Math.ceil($totalItems / $itemLimit);
    return `calc(100% / ${rowCount})`;
  }}; //  총 item의 개수 / row 아이템의 수
  display: flex;
  justify-content: center;
  align-items: center;
`;
