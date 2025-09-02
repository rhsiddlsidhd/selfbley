import { AnimationProgressTypes } from "../../pages/Main";

export const handleFadeAnimation = ({
  state,
  isInView,
}: {
  state: AnimationProgressTypes;
  isInView: boolean;
}): "show" | "hidden" | "exit" => {
  if (!isInView) return "exit";

  return ["SLIDE", "FADE"].includes(state) ? "show" : "hidden";
};
