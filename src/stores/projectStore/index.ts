import { create } from "zustand";
import { BADGE_COLORS_KEY } from "../../types/style";
import { FilterType } from "../../pages/TheProjects";

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
  setFilter: (FilterType: FilterType) => void;
  setProjects: (projects: ProjectModel[]) => void;
}

const initialState: Omit<ProjectStore, "setProjects" | "setFilter"> = {
  projects: [],
  filter: "ALL",
};

const useProjectStore = create<ProjectStore>((set) => ({
  ...initialState,
  setProjects: (projects: ProjectModel[]) => set({ projects }),
  setFilter: (filter: FilterType) => set({ filter }),
}));

export default useProjectStore;
