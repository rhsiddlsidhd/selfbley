const baseURL = import.meta.env.VITE_PROJECTS_BASE_URL;
const id = import.meta.env.VITE_GITHUB_USER_ID;
const repoURL = import.meta.env.VITE_GITHUB_REPO_URL;

export const getBookApi = async () => {
  try {
    const url = `${baseURL}/${id}/${repoURL}/books`;
    const res = await fetch(url);
    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(`res error fail status(${res.status}) : ${data.error}`);
    }

    return data;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error("server error");
    }
  }
};
