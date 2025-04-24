import { SetStateAction, useRef } from "react";
import RollerItem from "../atoms/RollerItem";
import { centerOffset, skillsKeys } from "../../constants/skillsConstants";
import { SkillIcons } from "../organism/SkillContent";

interface SkillRollerListProps {
  activeIndex: number;
}

export const RollerItems = ({ activeIndex }: SkillRollerListProps) => {
  const underlineRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const centerIndex = activeIndex + centerOffset;
  const marqueeSkillsKeys = [...skillsKeys, ...skillsKeys];

  return (
    <>
      {marqueeSkillsKeys.map((skill, i, arr) => {
        const id = arr[centerIndex];
        return <RollerItem underlineRef={underlineRef} key={`${skill}-${i}`} />;
      })}
    </>
  );
};
