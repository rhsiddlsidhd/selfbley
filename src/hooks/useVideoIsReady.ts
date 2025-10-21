import { useEffect, useRef, useState } from "react";

const useVideoIsReady = () => {
  const startTimeRef = useRef<number>(Date.now());
  const [loaded, setLoaded] = useState(false);
  const [minTimeReached, setMinTimeReached] = useState(false);
  const MIN_LOADING_TIME = 2000;
  useEffect(() => {
    startTimeRef.current = Date.now();

    const minTimer = setTimeout(() => {
      setMinTimeReached(true);
    }, MIN_LOADING_TIME);

    return () => clearTimeout(minTimer);
  }, []);

  const handleVideoLoaded = () => {
    const elapsedTime = Date.now() - startTimeRef.current;

    if (elapsedTime >= MIN_LOADING_TIME) {
      setLoaded(true);
    } else {
      const remainingTime = MIN_LOADING_TIME - elapsedTime;
      setTimeout(() => {
        setLoaded(true);
      }, remainingTime);
    }
  };

  return { isLoaded: loaded && minTimeReached, handleVideoLoaded };
};

export default useVideoIsReady;
