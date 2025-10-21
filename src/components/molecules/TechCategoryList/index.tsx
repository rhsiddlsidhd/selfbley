import Badge from "../../atoms/Badge";
import Text from "../../atoms/Text";
import { TechnologyKeys } from "../../organism/TechnologiesSection/SlotMachine";

const TechCategoryList = ({
  technologies,
}: {
  technologies: Partial<Record<TechnologyKeys, string[]>>;
}) => {
  return (
    <div>
      {Object.entries(technologies).map(([category, techList]) => {
        return (
          <div key={category}>
            <Text $fontWeight="bold" $fontSize="sm">
              {category.toUpperCase()}
            </Text>
            <div style={{ display: "flex", gap: "2px", flexWrap: "wrap" }}>
              {techList.map((tech) => (
                <Badge key={tech} $key={category as TechnologyKeys}>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TechCategoryList;
