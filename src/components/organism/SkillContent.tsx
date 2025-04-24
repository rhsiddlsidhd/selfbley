import { motion } from "motion/react";
import { styled } from "styled-components";
import {
  SKILL_CONTENT_TOTAL_COLUMNS,
  technology,
} from "../../constants/skillsConstants";
import useScreenStore from "../../stores/useScreenStore";
import RollingSkills from "./RollingSkills";
import {
  getSkillContentActiveColumn,
  getSkillContentWidth,
} from "../../utils/calculation";
interface SkillContentProps {
  isSticky: boolean;
}

export interface SkillIcons {
  name: string;
  icon: string;
}

const SkillContent = ({ isSticky }: SkillContentProps) => {
  const mode = useScreenStore((state) => state.mode);

  const activeColumns = getSkillContentActiveColumn(mode);

  const contentWidth = getSkillContentWidth(activeColumns);

  return (
    <ContentWrapper
      animate={{
        width: isSticky ? contentWidth : "100%",
        height: isSticky ? "50%" : "100%",
      }}
    >
      <motion.div
        animate={{
          display: isSticky ? "none" : "block",
          opacity: isSticky ? 0 : 1,
        }}
      >
        <p>{technology["overview"].description}</p>
      </motion.div>
      <RollingSkills isSticky={isSticky} />
    </ContentWrapper>
  );
};

export default SkillContent;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
