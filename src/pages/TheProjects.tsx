import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { motion } from "motion/react";
import { BadgeTypes } from "../components/atoms/Badge";
import Project from "../components/organism/Project";
import VerticalLine from "../components/atoms/VerticalLine";
import useScreenStore, { Mode } from "../stores/useScreenStore";
import { getProjectApi } from "../api/projectApi";
import ProjectAside from "../components/organism/ProjectAside";
import ProjectFilter from "../components/organism/ProjectFilter";
import SlideInXOverlay from "../components/atoms/SlideInXOverlay";

export type FilterType = "ALL" | "TEAM" | "SINGLE";

export interface ProjectData {
  mode: Exclude<BadgeTypes, "frontend" | "backend" | "etc">;
  title: string;
  overView: string;
  socialLinks: { name: string; icon: string; href: string }[];
  thumnail: string;
  technologies: Partial<
    Record<Exclude<BadgeTypes, "SINGLE" | "TEAM">, string[]>
  >;
  description: string;
}

const TheProjects = () => {
  const mode = useScreenStore((state) => state.mode);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("ALL");
  const [projectData, setProjectData] = useState<ProjectData[]>([]);

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
    const getProjectDataApi = async () => {
      const data = await getProjectApi();

      if (data) setProjectData(data);
    };
    getProjectDataApi();
  }, []);

  return (
    <Container>
      <SlideInXOverlay />
      <VerticalLine page="THEPROJECTS" />
      <ProjectContent>
        <ProjectFilter
          setSelectedFilter={setSelectedFilter}
          selectedFilter={selectedFilter}
        />
        <ProjectWrapper $mode={mode}>
          {filteredData(projectData).map((data, i) => {
            return (
              <Project
                key={`${i} ${selectedFilter}`}
                data={data}
                index={i + 1}
              />
            );
          })}
        </ProjectWrapper>
      </ProjectContent>
      <ProjectAside />
    </Container>
  );
};

export default TheProjects;

const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  z-index: 2;
`;

const ProjectWrapper = styled.div<{ $mode: Mode }>`
  //mobile

  ${({ $mode }) =>
    $mode === "mobile" &&
    css`
      width: calc(100% * 2 / 3);
      display: flex;
      align-items: center;
      flex-direction: column;
    `}
`;

const ProjectContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;
  z-index: 10;
  flex: 4;
`;
