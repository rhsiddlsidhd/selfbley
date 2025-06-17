import snowboard_webm from "../../assets/video/webm/snowboard.webm";
import programming_webm from "../../assets/video/webm/programming.webm";
import run_webm from "../../assets/video/webm/run.webm";
import tennis_webm from "../../assets/video/webm/tennis.webm";
import snowboard_mp4 from "../../assets/video/mp4/snowboard.mp4";
import run_mp4 from "../../assets/video/mp4/run.mp4";
import tennis_mp4 from "../../assets/video/mp4/tennis.mp4";
import programming_mp4 from "../../assets/video/mp4/programming.mp4";

export const homeVideosMp4 = [
  `${snowboard_mp4}`,
  `${run_mp4}`,
  `${tennis_mp4}`,
  `${programming_mp4}`,
] as const;
export const homeVideosWebm = [
  `${snowboard_webm}`,
  `${run_webm}`,
  `${tennis_webm}`,
  `${programming_webm}`,
] as const;

export const homeVideos = homeVideosMp4.map((mp4, i) => ({
  mp4,
  webm: homeVideosWebm[i],
}));
