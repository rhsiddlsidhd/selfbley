import { AnimationType } from "../../stores/useAnimationProgress";

export const handleFadeAnimation = ({
  type,
  isInView,
}: {
  type: AnimationType;
  isInView: boolean;
}): "show" | "hidden" | "exit" => {
  if (!isInView) return "exit";

  return ["BACKGROUND_VIDEO_VIEW", "ADD_ANIMATION"].includes(type)
    ? "show"
    : "hidden";
};
