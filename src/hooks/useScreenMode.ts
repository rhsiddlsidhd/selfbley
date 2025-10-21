import { useCallback, useEffect } from "react";

import { debounce } from "lodash";
import useScreenStore from "../stores/screenStore";

const useScreenMode = () => {
  const setMode = useScreenStore((state) => state.setMode);

  const getBrowserMode = useCallback(() => {
    const width = window.innerWidth;
    const type = width > 1024 ? "desktop" : width > 768 ? "tablet" : "mobile";
    const currentMode = useScreenStore.getState().mode;
    if (currentMode !== type) setMode(type);
  }, [setMode]);

  const debounceGetBrowserMode = debounce(getBrowserMode, 1000);

  useEffect(() => {
    getBrowserMode();
    window.addEventListener("resize", debounceGetBrowserMode);
    return () => window.removeEventListener("resize", debounceGetBrowserMode);
  }, [getBrowserMode, debounceGetBrowserMode]);
};

export default useScreenMode;
