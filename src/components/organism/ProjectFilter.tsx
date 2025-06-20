import { motion } from "motion/react";
import React from "react";
import styled from "styled-components";
import { FilterType } from "../../pages/TheProjects";
import useScreenStore, { Mode } from "../../stores/useScreenStore";
import { AnimationProgressTypes } from "../../pages/Main";

const ProjectFilter = ({
  setSelectedFilter,
  selectedFilter,
  state,
  setState,
}: {
  setSelectedFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  selectedFilter: FilterType;
  state: AnimationProgressTypes;
  setState: React.Dispatch<React.SetStateAction<AnimationProgressTypes>>;
}) => {
  const filterTabs = ["ALL", "TEAM", "SINGLE"] as const;

  const mode = useScreenStore((state) => state.mode);
  const isSelected = (tab: FilterType) => selectedFilter === tab;
  const handleFilterChange = (e: React.MouseEvent, tab: FilterType) => {
    e.preventDefault();
    if (isSelected(tab)) return;
    setSelectedFilter(tab);
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
          <FilterTab $isSelected={isSelected(tab)} key={i}>
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
  hidden: { opacity: 0, y: "100px" },
  show: { opacity: [0, 0, 1], y: 0, transition: { duration: 0.3 } },
};
const FilterWrapper = styled(motion.div)<{ $mode: Mode }>`
  width: ${({ $mode }) => ($mode === "mobile" ? "calc(100% * 2/3)" : "50%")};
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FilterTab = styled.div<{ $isSelected: boolean }>`
  flex: 1;
  position: ${({ $isSelected }) => ($isSelected ? "relative" : "static")};
  cursor: pointer;
  font-size: clamp(0.75rem, 2vw, 2rem);

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
    background-color: #f50585;
  }
`;
