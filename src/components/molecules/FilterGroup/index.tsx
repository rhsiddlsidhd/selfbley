import { motion } from "motion/react";
import styled, { css } from "styled-components";
import useScreenStore, { Mode } from "../../../stores/useScreenStore";
import useProjectStore from "../../../stores/projectStore";
import { FilterType } from "../../../pages/TheProjects";
import { slideInUp } from "../../../styles/variants";

const FilterGroup = () => {
  const mode = useScreenStore((state) => state.mode);
  const animationProgress = useProjectStore((state) => state.animationProgress);
  const filter = useProjectStore((state) => state.filter);
  const setFilter = useProjectStore((state) => state.setFilter);
  const filterLabels = ["ALL", "TEAM", "SINGLE"] as const;
  const isSelected = (label: FilterType) => filter === label;
  return (
    <Group
      $mode={mode}
      initial="hidden"
      animate={animationProgress === "PENDING" ? "show" : "hidden"}
      variants={slideInUp}
    >
      {filterLabels.map((label, index) => (
        <Btn
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          key={index}
          onClick={() => setFilter(label)}
        >
          {label}
          {isSelected(label) && (
            <motion.div layoutId="indicator" className="indicator" />
          )}
        </Btn>
      ))}
    </Group>
  );
};

export default FilterGroup;

const Group = styled(motion.div)<{ $mode: Mode }>`
  ${({ theme, $mode }) =>
    $mode === "mobile"
      ? theme.responseWidth(4)
      : css`
          width: 50%;
        `}
  display:flex;
`;

const Btn = styled(motion.button)`
  flex: 1;
  position: relative;
  cursor: pointer;
  padding: 0.5rem 0;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.COLORS.white};
  .indicator {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: ${({ theme }) => theme.COLORS.pink};
  }
`;
