import { useEffect, useState } from "react";

const useActiveIndex = ({
  isInView,
  max,
}: {
  isInView: boolean;
  max: number;
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const INTERVAL_TIME = 5000;

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % max);
    }, INTERVAL_TIME);

    return () => {
      clearInterval(interval);
    };
  }, [isInView, max]);

  return { activeIndex };
};

export default useActiveIndex;
