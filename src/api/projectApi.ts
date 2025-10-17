import { ProjectModel } from "../stores/projectStore";
import { APIRESPONSE } from "../types/api";

const baseURL = import.meta.env.VITE_PROJECTS_BASE_URL;
const id = import.meta.env.VITE_GITHUB_USER_ID;
const repoURL = import.meta.env.VITE_GITHUB_REPO_URL;

export const getProjectApi = async (): Promise<APIRESPONSE<ProjectModel[]>> => {
  try {
    const url = `${baseURL}/${id}/${repoURL}/projects`;

    const res = await fetch(url);
    const data: ProjectModel[] = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "프로젝트 데이터를 가져오지 못했습니다.",
        error: {
          code: res.status,
        },
      };
    }

    return {
      success: true,
      message: "프로젝트 데이터를 성공적으로 가져왔습니다.",
      data,
    };
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "서버 오류가 발생했습니다.";
    console.error(message);
    return {
      success: false,
      message: "프로젝트 데이터 요청 중 오류가 발생했습니다.",
      error: { code: 500 },
    };
  }
};
