import { useEffect } from "react";
import styled from "styled-components";
import { motion } from "motion/react";

import useProjectStore, { ProjectModel } from "../../stores/projectStore";
import { getProjectApi } from "../../api/projectApi";
import FilterGroup from "../../components/molecules/FilterGroup";
import ProjectAside from "../../components/organism/ProjectAside";
import ProjectSection from "../../components/organism/ProjectSection";

const ProjectsPage = () => {
  const selectedFilter = useProjectStore((state) => state.filter);
  const projects = useProjectStore((state) => state.projects);
  const setProject = useProjectStore((state) => state.setProjects);
  const clearState = useProjectStore((state) => state.clearState);
  const filteredData = (data: ProjectModel[]) => {
    switch (selectedFilter) {
      case "SINGLE":
        return data.filter(({ mode }) => mode === "SINGLE");
      case "TEAM":
        return data.filter(({ mode }) => mode === "TEAM");
      default:
        return data;
    }
  };

  useEffect(() => {
    const getProjectDataApi = async (): Promise<void> => {
      const res = await getProjectApi();
      setProject(res.success ? res.data : []);
    };
    getProjectDataApi();

    return () => clearState();
  }, [setProject, clearState]);

  const selectedProjects = filteredData(projects);

  return (
    <Container>
      <ProjectContent>
        <FilterGroup />
        <ProjectSection projects={selectedProjects} />
      </ProjectContent>
      <ProjectAside />
    </Container>
  );
};

export default ProjectsPage;

const Container = styled.div`
  display: flex;
  position: relative;
  z-index: 5;
`;

const ProjectContent = styled(motion.div)`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
`;
