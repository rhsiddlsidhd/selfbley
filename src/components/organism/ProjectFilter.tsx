import { motion } from "motion/react";
import React from "react";
import styled, { css } from "styled-components";
import { FilterType } from "../../pages/TheProjects";
import useScreenStore, { Mode } from "../../stores/useScreenStore";
import { AnimationProgressTypes } from "../../pages/Main";
import useProjectStore from "../../stores/projectStore";

const ProjectFilter = ({
  state,
  setState,
}: {
  state: AnimationProgressTypes;
  setState: React.Dispatch<React.SetStateAction<AnimationProgressTypes>>;
}) => {
  const filterTabs = ["ALL", "TEAM", "SINGLE"] as const;
  const setFilter = useProjectStore((state) => state.setFilter);
  const filter = useProjectStore((state) => state.filter);
  const mode = useScreenStore((state) => state.mode);
  const isSelected = (tab: FilterType) => filter === tab;
  const handleFilterChange = (e: React.MouseEvent, tab: FilterType) => {
    e.preventDefault();
    if (isSelected(tab)) return;

    setFilter(tab);
  };

  return (
    <FilterWrapper
      initial="hidden"
      animate={state === "INITIAL" || state === "SLIDE" ? "show" : "hidden"}
      variants={slideInUp}
      $mode={mode}
      onAnimationComplete={() => setState("SLIDE")}
    >
      {filterTabs.map((tab, i) => {
        return (
          <FilterTab key={i}>
            <motion.a
              href="#"
              onClick={(e) => handleFilterChange(e, tab)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              style={{ color: "white" }}
            >
              {tab}
            </motion.a>
            {isSelected(tab) && (
              <motion.div layoutId="indicator" className="indicator" />
            )}
          </FilterTab>
        );
      })}
    </FilterWrapper>
  );
};

export default ProjectFilter;

const slideInUp = {
  hidden: { opacity: 0, y: "10px" },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};
const FilterWrapper = styled(motion.div)<{ $mode: Mode }>`
  ${({ theme, $mode }) =>
    $mode === "mobile"
      ? theme.responseWidth(4)
      : css`
          width: 50%;
        `}
  display: flex;
`;

const FilterTab = styled.div`
  flex: 1;
  position: relative;
  cursor: pointer;
  font-size: ${({ theme }) => theme.FONT_SIZE.clamp6};
  & > a {
    display: flex;
    justify-content: center;
    padding: 0.5rem 0;
    text-decoration: none;
    font-weight: bold;
  }
  .indicator {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: ${({ theme }) => theme.COLORS.pink};
  }
`;
