import { memo } from "react";

import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";
import { technology, TechnologyKey } from "../../constants/skillsConstants";

import useScreenStore from "../../stores/useScreenStore";
import {
  getSKillIconsWidth,
  getSkillIconWidth,
  getSkillIconsGap,
} from "../../utils/calculation";

const RollingSkillIcons = memo(
  ({ isHover }: { isHover: TechnologyKey | null }) => {
    /**
     * 해당 컴포넌트는 isHover 시에만 리렌더 되고 이외에는 리렌더 되지 않도록 memo
     */

    const mode = useScreenStore((state) => state.mode);
    const ICON_WIDTH = getSkillIconWidth(mode);
    const ICONS_GAP = getSkillIconsGap(mode);
    const techs = isHover ? technology[isHover] : [];
    const ICONS_TOTAL_WIDTH = getSKillIconsWidth(
      ICON_WIDTH,
      ICONS_GAP,
      techs.length
    );

    return (
      <IconsBoxContainer>
        <AnimatePresence>
          {isHover && (
            <IconWrapper
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              $ICONS_GAP={ICONS_GAP}
              $TOTAL_WIDTH={ICONS_TOTAL_WIDTH}
            >
              {techs.map(({ icon, name }) => {
                return (
                  <Icon $ICON_WIDTH={ICON_WIDTH} key={name}>
                    <img src={icon} alt="아이콘" />
                  </Icon>
                );
              })}
            </IconWrapper>
          )}
        </AnimatePresence>
      </IconsBoxContainer>
    );
  }
);

export default RollingSkillIcons;

const IconsBoxContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: -1;
`;

const Icon = styled.div<{ $ICON_WIDTH: number }>`
  flex: 0 0 ${({ $ICON_WIDTH }) => `${$ICON_WIDTH}rem`};
  aspect-ratio: 1 / 1;
  background-color: white;
  border-radius: 10px;
  padding: 0.5rem;

  & > img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;
const IconWrapper = styled(motion.div)<{
  $ICONS_GAP: number;
  $TOTAL_WIDTH: string;
}>`
  display: flex;
  justify-content: end;
  gap: ${({ $ICONS_GAP }) => `${$ICONS_GAP}rem`};
  flex-wrap: wrap;
  width: ${({ $TOTAL_WIDTH }) => $TOTAL_WIDTH};
  border-top-left-radius: 10px;
`;
