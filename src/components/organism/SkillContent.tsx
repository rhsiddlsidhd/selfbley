import { motion } from "motion/react";
import { styled } from "styled-components";
import { technology } from "../../constants/skillsConstants";
import useScreenStore from "../../stores/useScreenStore";
import RollingSkills from "./RollingSkills";
interface SkillContentProps {
  isSticky: boolean;
}

export interface SkillIcons {
  name: string;
  icon: string;
}

const SkillContent = ({ isSticky }: SkillContentProps) => {
  const mode = useScreenStore((state) => state.mode);

  const TOTAL_COLUMNS = 6;
  const ACTIVE_COLUMENS = mode === "mobile" ? 4 : 2;

  return (
    <ContentWrapper
      animate={{
        width: isSticky
          ? `calc(100% / ${TOTAL_COLUMNS} *  ${ACTIVE_COLUMENS})`
          : "100%", //mobile 에서는 4개 그외 2개

        height: isSticky ? "50%" : "100%",
      }}
    >
      <Ovewview
        animate={{
          display: isSticky ? "none" : "block",
          opacity: isSticky ? 0 : 1,
        }}
      >
        <p>{technology["overview"].description}</p>
      </Ovewview>
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

const Ovewview = styled(motion.div)``;
