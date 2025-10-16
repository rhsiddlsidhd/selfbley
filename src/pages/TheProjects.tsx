import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "motion/react";

import Project from "../components/organism/Project";
import useScreenStore, { Mode } from "../stores/useScreenStore";
import { getProjectApi } from "../api/projectApi";
import ProjectAside from "../components/organism/ProjectAside";
import ProjectFilter from "../components/organism/ProjectFilter";
import { AnimationProgressTypes } from "./Main";
import { BADGE_COLORS_KEY } from "../types/style";

export type FilterType = "ALL" | "TEAM" | "SINGLE";

export interface ProjectData {
  mode: Exclude<BADGE_COLORS_KEY, "frontend" | "backend" | "etc" | "language">;
  title: string;
  overView: string;
  socialLinks: { name: string; icon: string; href: string }[];
  thumbnail: string;
  technologies: Partial<
    Record<Exclude<BADGE_COLORS_KEY, "SINGLE" | "TEAM">, string[]>
  >;
  deployUrl: string;
  description: string;
}

const TheProjects = () => {
  const mode = useScreenStore((state) => state.mode);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("ALL");
  const [projectData, setProjectData] = useState<ProjectData[] | null>(null);
  const [animationProcess, setAnimationProcess] =
    useState<AnimationProgressTypes>("INITIAL");
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsView(true), 1500);
  }, []);

  const filteredData = (data: ProjectData[]) => {
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
      setProjectData(res.success ? res.data : []);
    };
    getProjectDataApi();
  }, []);

  return (
    <Container>
      {isView && (
        <ProjectContent>
          <ProjectFilter
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
            state={animationProcess}
            setState={setAnimationProcess}
          />
          <ProjectWrapper $mode={mode}>
            {projectData && projectData.length > 0 ? (
              filteredData(projectData).map((data, i) => {
                return (
                  <Project
                    state={animationProcess}
                    key={`${i} ${selectedFilter}`}
                    data={data}
                    index={i + 1}
                  />
                );
              })
            ) : (
              <p>프로젝트 데이터가 없습니다.</p>
            )}
          </ProjectWrapper>
        </ProjectContent>
      )}
      <ProjectAside />
    </Container>
  );
};

export default TheProjects;

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
