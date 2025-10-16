import { create } from "zustand";
import { BADGE_COLORS_KEY } from "../../types/style";
import { FilterType } from "../../pages/TheProjects";
import { AnimationProgressTypes } from "../../pages/Main";

export interface ProjectModel {
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

interface ProjectStore {
  projects: ProjectModel[];
  filter: FilterType;
  animationProgress: AnimationProgressTypes;
  setFilter: (FilterType: FilterType) => void;
  setProjects: (projects: ProjectModel[]) => void;
  setAnimationProgress: (state: AnimationProgressTypes) => void;
  clearState: () => void;
}

const initialState: Omit<
  ProjectStore,
  "setProjects" | "setFilter" | "setAnimationProgress" | "clearState"
> = {
  projects: [],
  filter: "ALL",
  animationProgress: "INITIAL",
};

const useProjectStore = create<ProjectStore>((set) => ({
  ...initialState,
  setProjects: (projects: ProjectModel[]) => set({ projects }),
  setFilter: (filter: FilterType) => set({ filter }),
  setAnimationProgress: (animationProgress: AnimationProgressTypes) =>
    set({ animationProgress }),
  clearState: () => set({ ...initialState }),
}));

export default useProjectStore;
