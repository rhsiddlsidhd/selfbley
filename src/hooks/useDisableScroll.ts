import { useEffect } from "react";

const useDisableScroll = () => {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
    window.document.body.style.overflow = "hidden";

    return () => {
      window.document.body.style.removeProperty("overflow");

      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, []);
};

export default useDisableScroll;
