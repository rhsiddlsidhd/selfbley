import { memo } from "react";

import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";

import useScreenStore from "../../stores/useScreenStore";
import {
  getSKillIconsWidth,
  getSkillIconWidth,
  getSkillIconsGap,
} from "../../utils/calculation";
import {
  TechnologyKeys,
  technologys,
} from "../organism/content/TechnologiesContent/constant";

const RollingSkillIcons = memo(
  ({ isHover }: { isHover: TechnologyKeys | null }) => {
    /**
     * 해당 컴포넌트는 isHover 시에만 리렌더 되고 이외에는 리렌더 되지 않도록 memo
     */

    const mode = useScreenStore((state) => state.mode);
    const ICON_WIDTH = getSkillIconWidth(mode);
    const ICONS_GAP = getSkillIconsGap(mode);
    // const techs = isHover ? technology[isHover] : [];
    // const ICONS_TOTAL_WIDTH = getSKillIconsWidth(
    //   ICON_WIDTH,
    //   ICONS_GAP,
    //   techs.length
    // );

    // technology 4개의 key를 전부 뿌려서 Wrapper 4개를 미리 로드
    // 이후 hover 한 key값만 Animated 적용시켜버리기

    return (
      <AnimatePresence>
        {Object.keys(technologys).map((key) => {
          const techKey = key as TechnologyKeys;
          const techs = technologys[techKey];
          const ICONS_TOTAL_WIDTH = getSKillIconsWidth(
            ICON_WIDTH,
            ICONS_GAP,
            techs.length
          );

          // 현재 hover된 key인지 확인
          const isCurrentHover = isHover === techKey;
          return (
            <IconWrapper
              key={techKey}
              initial={{ y: "100%" }}
              animate={{ y: isCurrentHover ? 0 : "100%" }}
              exit={{ y: "100%" }}
              $ICONS_GAP={ICONS_GAP}
              $TOTAL_WIDTH={ICONS_TOTAL_WIDTH}
              style={{
                opacity: isCurrentHover ? 1 : 0,
              }}
            >
              {techs.map((tech, i) => (
                <Icon $ICON_WIDTH={ICON_WIDTH} key={i}>
                  <img src={`/skills/${tech}.svg`} alt={tech} />
                </Icon>
              ))}
            </IconWrapper>
          );
        })}
      </AnimatePresence>
    );
  }
);

export default RollingSkillIcons;

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
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: -1;
  display: flex;
  justify-content: end;
  gap: ${({ $ICONS_GAP }) => `${$ICONS_GAP}rem`};
  flex-wrap: wrap;
  width: ${({ $TOTAL_WIDTH }) => $TOTAL_WIDTH};
  border-top-left-radius: 10px;
`;
