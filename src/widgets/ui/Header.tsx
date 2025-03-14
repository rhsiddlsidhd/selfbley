import { Outlet } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

import OverlayHeader from "./OverlayHeader";
import ExpandeHeader from "./ExpandeHeader";

export type Mode = "desktop" | "tablet" | "mobile";

const Header = () => {
  const [mode, setMode] = useState<Mode | null>(null);

  const getBrowserMode = useCallback(() => {
    const width = window.innerWidth;
    const type = width > 1024 ? "desktop" : width > 768 ? "tablet" : "mobile";
    setMode(type);
  }, []);
  const debounceGetBrowserMode = debounce(getBrowserMode, 1000);

  useEffect(() => {
    getBrowserMode();
    window.addEventListener("resize", debounceGetBrowserMode);
    return () => window.removeEventListener("resize", debounceGetBrowserMode);
  }, [debounceGetBrowserMode, getBrowserMode]);

  if (mode === null) {
    return null; //로딩
  }

  return (
    <>
      {mode !== "mobile" ? (
        <ExpandeHeader mode={mode} />
      ) : (
        <OverlayHeader mode={mode} />
      )}
      <Outlet />
    </>
  );
};

export default Header;
