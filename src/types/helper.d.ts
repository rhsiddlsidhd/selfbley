import { ROUTESKeys } from "./routes";

export interface CalculatetabWidth {
  id: ROUTESKeys;
  ref: React.RefObject<Record<ROUTESKeys, HTMLParagraphElement | null>>;
}
