import { ProjectModel } from "../../../stores/projectStore";
import useScreenStore, { Mode } from "../../../stores/screenStore";
import Project from "../../molecules/Project";
import styled from "styled-components";

const ProjectSection = ({ projects }: { projects: ProjectModel[] }) => {
  const mode = useScreenStore((state) => state.mode);
  return (
    <ProjectWrapper $mode={mode}>
      {projects.length > 0 ? (
        projects.map((data, i) => <Project key={i} index={i + 1} data={data} />)
      ) : (
        <p>프로젝트 데이터가 없습니다.</p>
      )}
    </ProjectWrapper>
  );
};

export default ProjectSection;

const ProjectWrapper = styled.div<{ $mode: Mode }>`
  width: 100%;
  ${({ $mode, theme }) => $mode === "mobile" && theme.responseWidth(4)}
`;
