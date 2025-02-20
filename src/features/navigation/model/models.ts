import { HandleNavigate } from "../../../widgets/model/models";

export const handleNavigate = ({ routes, tab, navigate }: HandleNavigate) => {
  switch (tab) {
    case "Intro":
    case "Skills":
    case "Projects":
    case "Career":
      navigate(routes[`${tab}`]);
      break;
    default:
      navigate("/not-abailable");
      break;
  }
};
