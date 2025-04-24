export const getProjectApi = async () => {
  try {
    const res = await fetch("http://localhost:3000/projects");
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
