import React, { ReactNode } from "react";
import useScreenStore from "../../stores/useScreenStore";

const TabletAndDesktop = ({ children }: { children: React.ReactNode }) => {
  const mode = useScreenStore((state) => state.mode);
  if (mode === "mobile") return;
  return <> {children}</>;
};

export default TabletAndDesktop;
