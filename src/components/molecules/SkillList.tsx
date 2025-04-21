import React from "react";
import { TechnologyKey, technology } from "../../constants/skillsConstants";

const SkillList = ({ tab }: { tab: TechnologyKey }) => {
  switch (tab) {
    case "overview": {
      const section = technology[tab];
      return <div>{section.title}</div>;
    }
    case "frontend":
    case "backend":
    case "etc":
    case "language":
      const section = technology[tab];
      return (
        <li>
          {section.title}:{" "}
          {section.items.map(({ name }) => {
            return (
              <span style={{ marginRight: "1rem" }} key={name}>
                {name}
              </span>
            );
          })}
        </li>
      );
  }
};

export default SkillList;
