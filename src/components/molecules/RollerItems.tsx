import RollerItem from "../atoms/RollerItem";
import { TechnologyKey, centerOffset } from "../../constants/skillsConstants";

interface SkillRollerListProps {
  marqueeSkillsKeys: TechnologyKey[];
  activeIndex: number;
  underlineWidth: number;
  underlineRef: React.RefObject<(HTMLParagraphElement | null)[]>;
}

export const RollerItems = ({
  marqueeSkillsKeys,
  activeIndex,
  underlineRef,
  underlineWidth,
}: SkillRollerListProps) => {
  return (
    <>
      {marqueeSkillsKeys.map((category, i) => {
        const isCenter = activeIndex + centerOffset === i;
        return (
          <RollerItem
            isCenter={isCenter}
            underlineRef={underlineRef}
            idx={i}
            category={category}
            underlineWidth={underlineWidth}
            key={`${category}-${i}`}
          />
        );
      })}
    </>
  );
};
