import { AnimatePresence, motion } from "motion/react";
import { styled } from "styled-components";
import {
  CLOSE_MODAL_TEXT,
  OPEN_MODAL_TEXT,
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

  const isToggleModal = useCallback(() => setIsModal((prev) => !prev), []);

  return (
    <Container>
      <AnimatePresence>
        {isSticky && (
          <ContentWrapper
            initial={{ opacity: 0 }}
            animate={{
              width: isSticky ? contentWidth : "100%",
              height: isSticky ? "50%" : "100%",
              opacity: isSticky ? 1 : 0,
            }}
            exit={{ opacity: 0 }}
          >
            <RollingSkills />
          </ContentWrapper>
        )}
      </AnimatePresence>
      <SKillModalBtn
        isSticky={isSticky}
        isModal={isToggleModal}
        text={!isModal ? OPEN_MODAL_TEXT : CLOSE_MODAL_TEXT}
      />
      <SkillModal isModal={isModal} contentWidth={contentWidth} />
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
  overflow: hidden;
`;
