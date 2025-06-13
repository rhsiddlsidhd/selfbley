import { signSVGConfig } from "../../constants/svg/sign-config";
import { paths } from "./../../constants/svg/sign-paths";

export const getSVGConfig = (type: keyof typeof paths) => signSVGConfig[type];
