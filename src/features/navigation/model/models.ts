import { HandleNavigate } from "../../../widgets/model/models";

export const handleNavigate = ({ routes, tap, navigate }: HandleNavigate) => {
  switch (tap) {
    case "LOGO":
    case "THESKILLS":
    case "THEPROJECTS":
    case "CONTACT":
      navigate(routes[`${tap}`]);
      break;
    default:
      navigate("/not-abailable");
      break;
  }
};
