import { useEffect, useState } from "react";

export const useVideoPreload = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // let loadedCount = 0;
    // const totalVideos = homeVideos.length;
    // homeVideos.forEach((video, index) => {
    //   const videoElement = document.createElement("video");
    //   videoElement.preload = "auto";
    //   videoElement.muted = true;
    //   const handleLoaded = () => {
    //     loadedCount++;
    //     console.log(`Video ${index} loaded: ${loadedCount}/${totalVideos}`);
    //     if (loadedCount === totalVideos) {
    //       console.log("All videos preloaded!");
    //       setIsLoaded(true); // 상태 업데이트로 리렌더링 트리거
    //     }
    //   };
    //   videoElement.addEventListener("canplaythrough", handleLoaded, {
    //     once: true,
    //   });
    //   videoElement.src = video.webm;
    //   videoElement.load();
    // });
    // let loadedCount = 0;
    // const totalVideos = homeVideos.length;
    // const id = setTimeout(() => {
    // homeVideos.forEach((video, index) => {
    //   const videoElement = document.createElement("video");
    //   videoElement.preload = "auto";
    //   videoElement.muted = true;
    //   const handleLoaded = () => {
    //     loadedCount++;
    //     console.log(`Video ${index} loaded: ${loadedCount}/${totalVideos}`);
    //     if (loadedCount === totalVideos) {
    //       console.log("All videos preloaded!");
    //       setIsLoaded(true); // 상태 업데이트로 리렌더링 트리거
    //     }
    //   };
    //   videoElement.addEventListener("canplaythrough", handleLoaded, {
    //     once: true,
    //   });
    //   videoElement.src = video.webm;
    //   videoElement.load();
    // });
    // setIsLoaded(true);
    // }, 1500);
    // return () => clearTimeout(id);
  }, []);

  return isLoaded;
};

export default useVideoPreload;
