import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { motion } from "motion/react";
import { BadgeTypes } from "../components/atoms/Badge";
import Project from "../components/organism/Project";
import useScreenStore, { Mode } from "../stores/useScreenStore";
import { getProjectApi } from "../api/projectApi";
import ProjectAside from "../components/organism/ProjectAside";
import ProjectFilter from "../components/organism/ProjectFilter";
import { AnimationProgressTypes } from "./Main";
import { SocialType } from "../components/molecules/SocialIcon";

export type FilterType = "ALL" | "TEAM" | "SINGLE";

export interface ProjectData {
  mode: Exclude<BadgeTypes, "frontend" | "backend" | "etc">;
  title: string;
  overView: string;
  socialLinks: { name: SocialType; icon: string; href: string }[];
  thumbnail: string;
  technologies: Partial<
    Record<Exclude<BadgeTypes, "SINGLE" | "TEAM">, string[]>
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
  width: 100%;
  display: flex;
  position: relative;
  z-index: 7;
`;

const ProjectWrapper = styled.div<{ $mode: Mode }>`
  //mobile
  width: 100%;
  ${({ $mode }) =>
    $mode === "mobile" &&
    css`
      width: calc(100% * 2 / 3);
      display: flex;
      align-items: center;
      flex-direction: column;
    `};
`;

const ProjectContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;
  z-index: 10;
  flex: 4;
`;
