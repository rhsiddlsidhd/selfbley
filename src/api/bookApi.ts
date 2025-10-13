export const fetchApiHandler = async (query: string) => {
  const BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:8080"
      : import.meta.env.VITE_DEPLOY_URL;

  const res = await fetch(`${BASE_URL}/api/search?q=${encodeURI(query)}`);

  return await res.json();
};
