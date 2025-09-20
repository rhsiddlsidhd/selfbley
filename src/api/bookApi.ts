const baseURL = import.meta.env.VITE_PROJECTS_BASE_URL;
const id = import.meta.env.VITE_GITHUB_USER_ID;
const repoURL = import.meta.env.VITE_GITHUB_REPO_URL;

export const getBookApi = async () => {
  try {
    const url = `${baseURL}/${id}/${repoURL}/books`;

    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(`response fail! status:${res.status}`);
    }
    const data = await res.json();

    return data;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error("server error");
    }
  }
};
