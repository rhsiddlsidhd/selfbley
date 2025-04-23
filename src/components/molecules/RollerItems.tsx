import { SetStateAction } from "react";
import RollerItem from "../atoms/RollerItem";
import { centerOffset, skillsKeys } from "../../constants/skillsConstants";

interface SkillRollerListProps {
  activeIndex: number;

  setFilterIcons: (val: any) => void;
  setIsHover: React.Dispatch<SetStateAction<boolean>>;
  startAutoPlay: () => void;
  stopAutoPlay: () => void;
}

export const RollerItems = ({
  activeIndex,
  setFilterIcons,
  setIsHover,
  startAutoPlay,
  stopAutoPlay,
}: SkillRollerListProps) => {
  const centerIndex = activeIndex + centerOffset;
  const marqueeSkillsKeys = [...skillsKeys, ...skillsKeys];

  return (
    <>
      {marqueeSkillsKeys.map((skill, i, arr) => {
        const id = arr[centerIndex];
        return (
          <RollerItem
            centerIndex={centerIndex}
            id={id}
            idx={i}
            setFilterIcons={setFilterIcons}
            setIsHover={setIsHover}
            skill={skill}
            startAutoPlay={startAutoPlay}
            stopAutoPlay={stopAutoPlay}
            key={`${skill}-${i}`}
          />
        );
      })}
    </>
  );
};
