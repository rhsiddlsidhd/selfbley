import { useEffect, useState } from "react";

const useScrollBottom = () => {
  const [reached, setReached] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

      if (isBottom && !reached) {
        setReached(true);
      } else if (!isBottom && reached) {
        setReached(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reached]);

  return { reached };
};

export default useScrollBottom;
