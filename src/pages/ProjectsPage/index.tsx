import { useEffect } from "react";
import styled from "styled-components";
import { motion } from "motion/react";

import useProjectStore, { ProjectModel } from "../../stores/projectStore";
import { getProjectApi } from "../../api/projectApi";
import FilterGroup from "../../components/molecules/FilterGroup";
import Project from "../../components/organism/Project";
import mapleleaf_webm from "../../assets/video/webm/mapleleaf.webm";
import Video from "../../components/atoms/Video";
import useScreenStore, { Mode } from "../../stores/screenStore";

const ProjectAside = () => {
  const mode = useScreenStore((state) => state.mode);

  if (mode === "mobile") return null;

  return (
    <Aside>
      <section>
        <Video src={mapleleaf_webm} />
      </section>
      <section>
        <p>Let’s imagine new futures and the strength to bring them to life</p>
      </section>
    </Aside>
  );
};

const Aside = styled.section`
  flex: 2;
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  overflow: hidden;
  z-index: 1;
  & > section {
    width: 50%;
    background-color: #313131;
    display: flex;
    flex-direction: column;
    justify-content: end;

    & > video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(100%);
    }

    & > p {
      padding: 0.5rem;
      font-weight: bold;
      width: 75%;
      max-width: 10rem;
      font-size: clamp(0.5rem, 1vw, 0.75rem);
      color: white;
    }
  }
`;

const ProjectsPage = () => {
  const mode = useScreenStore((state) => state.mode);
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
        <ProjectWrapper $mode={mode}>
          {selectedProjects.length > 0 ? (
            selectedProjects.map((data, i) => (
              <Project key={i} index={i + 1} data={data} />
            ))
          ) : (
            <p>프로젝트 데이터가 없습니다.</p>
          )}
        </ProjectWrapper>
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

const ProjectWrapper = styled.div<{ $mode: Mode }>`
  width: 100%;
  ${({ $mode, theme }) => $mode === "mobile" && theme.responseWidth(4)}
`;

const ProjectContent = styled(motion.div)`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
`;
