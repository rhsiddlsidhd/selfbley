import RollerItem from "../atoms/RollerItem";
import { TechnologyKey, centerOffset } from "../../constants/skillsConstants";

interface SkillRollerListProps {
  marqueeSkillsKeys: TechnologyKey[];
  centerIndex: number;
  underlineWidth: number;
  underlineRef: React.RefObject<(HTMLParagraphElement | null)[]>;
}

export const RollerItems = ({
  marqueeSkillsKeys,
  centerIndex,
  underlineRef,
  underlineWidth,
}: SkillRollerListProps) => {
  return (
    <>
      {marqueeSkillsKeys.map((category, i) => {
        const isCenter = centerIndex === i;
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
