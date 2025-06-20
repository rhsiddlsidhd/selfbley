import { AnimatePresence, motion } from "motion/react";
import { styled } from "styled-components";
import {
  CLOSE_MODAL_TEXT,
  OPEN_MODAL_TEXT,
  VERTICAL_COUNT_3,
  VERTICAL_COUNT_4,
  VERTICAL_TOTAL_LINE,
} from "../../constants/skillsConstants";
import useScreenStore from "../../stores/useScreenStore";
import RollingSkills from "./RollingSkills";

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

/**
 * width 로 고정 사이즈를 두고
 * scale로 animation
 */

const SkillContent = ({ isSticky }: SkillContentProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const mode = useScreenStore((state) => state.mode);

  const isToggleModal = useCallback(() => setIsModal((prev) => !prev), []);

  return (
    <Container>
      <AnimatePresence>
        {isSticky && (
          <ContentWrapper
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            $total={VERTICAL_TOTAL_LINE}
            $count={mode === "mobile" ? VERTICAL_COUNT_4 : VERTICAL_COUNT_3}
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
      <SkillModal isModal={isModal} />
    </Container>
  );
};

export default SkillContent;

const Container = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled(motion.div)<{ $total: number; $count: number }>`
  overflow: hidden;
  width: ${({ $count, $total }) => `calc(100% / ${$total} * ${$count})`};
  height: 50vh;
  overflow: hidden;
`;
