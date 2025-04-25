import { motion } from "motion/react";
import { styled } from "styled-components";
import {
  CLOSE_MODAL_TEXT,
  OPEN_MODAL_TEXT,
  skillOverview,
} from "../../constants/skillsConstants";
import useScreenStore from "../../stores/useScreenStore";
import RollingSkills from "./RollingSkills";
import {
  getSkillContentActiveColumn,
  getSkillContentWidth,
} from "../../utils/calculation";
import { useCallback, useState } from "react";
import SKillModalBtn from "./SKillModalBtn";
import SkillModal from "./SkillModal";
interface SkillContentProps {
  isSticky: boolean;
}

export interface SkillIcons {
  name: string;
  icon: string;
}

const SkillContent = ({ isSticky }: SkillContentProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const mode = useScreenStore((state) => state.mode);
  const activeColumns = getSkillContentActiveColumn(mode);
  const contentWidth = getSkillContentWidth(activeColumns);

  const handleIsModal = () => {
    setIsModal((prev) => {
      if (prev === false) {
        // stopAutoPlay();
        return !isModal;
      } else {
        // startAutoPlay();
        return !isModal;
      }
    });
  };

  const isToggleModal = useCallback(handleIsModal, [isModal]);

  return (
    <Container>
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
          <h2 style={{ display: "flex", justifyContent: "center" }}>
            {skillOverview}
          </h2>
        </motion.div>
        {isSticky && <RollingSkills isSticky={isSticky} />}
        <SKillModalBtn
          isSticky={isSticky}
          isModal={isToggleModal}
          text={!isModal ? OPEN_MODAL_TEXT : CLOSE_MODAL_TEXT}
        />
        {isSticky && (
          <SkillModal isModal={isModal} contentWidth={contentWidth} />
        )}
      </ContentWrapper>
    </Container>
  );
};

export default SkillContent;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
