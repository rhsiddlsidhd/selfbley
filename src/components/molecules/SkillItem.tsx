import React from "react";
import { TechnologyKey, technology } from "../../constants/skillsConstants";

import SkillOverview from "./SkillOverview";
import SkillsColumn from "./SkillsColumn";
import SkillsRow from "./SkillsRow";

interface SkillItemProps {
  tab: TechnologyKey;
}

const SkillItem = React.memo(({ tab }: SkillItemProps) => {
  switch (tab) {
    case "overview": {
      const section = technology[tab];
      return <SkillOverview section={section} />;
    }
    case "frontend":
    case "backend": {
      const section = technology[tab];
      return section.items.map(({ name, icon }, _, arr) => (
        <SkillsColumn key={name} total={arr.length} {...{ name, icon }} />
      ));
    }
    case "etc":
    case "language": {
      const section = technology[tab];
      return section.items.map(({ name, icon }, _, arr) => (
        <SkillsRow key={name} total={arr.length} {...{ name, icon }} />
      ));
    }
  }
});

export default SkillItem;
