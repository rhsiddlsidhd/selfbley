import { HandleNavigate } from "../types/routes";

export const handleNavigate = ({ routes, tab, navigate }: HandleNavigate) => {
  switch (tab) {
    case "LOGO":
    case "THESKILLS":
    case "THEPROJECTS":
    case "CONTACT":
      navigate(routes[`${tab}`]);
      break;
    default:
      navigate("/not-abailable");
      break;
  }
};
