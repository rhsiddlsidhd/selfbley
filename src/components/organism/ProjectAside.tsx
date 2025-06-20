import styled from "styled-components";
import mapleleaf_mp4 from "../../assets/video/mp4/mapleleaf.mp4";
import mapleleaf_webm from "../../assets/video/webm/mapleleaf.webm";
import useScreenStore from "../../stores/useScreenStore";
import { useEffect, useRef } from "react";

const ProjectAside = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mode = useScreenStore((state) => state.mode);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const sources = Array.from(video.querySelectorAll("source"));

    if (sources.length === 0) return;

    const tryLoadSource = (index: number) => {
      if (index >= sources.length) {
        console.warn("모든 비디오 소스를 로드 실패했습니다.");
        return;
      }

      const sourceUrl = sources[index].getAttribute("data-src");
      if (!sourceUrl) {
        tryLoadSource(index + 1);
        return;
      }

      video.src = sourceUrl;
      video.load();

      const onCanPlay = () => {
        video.play().catch(() => {});
        cleanup();
      };

      const onError = () => {
        cleanup();
        tryLoadSource(index + 1);
      };

      const cleanup = () => {
        video.removeEventListener("canplay", onCanPlay);
        video.removeEventListener("error", onError);
      };

      video.addEventListener("canplay", onCanPlay);
      video.addEventListener("error", onError);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tryLoadSource(0);
          observer.disconnect();
        }
      });
    });

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (mode === "mobile") return null;

  return (
    <Aside>
      <section>
        <video ref={videoRef} loop muted autoPlay>
          <source data-src={mapleleaf_webm} type="video/webm"></source>
          <source data-src={mapleleaf_mp4} type="video/mp4"></source>
          <strong>Your browser does not support the video tag.</strong>
        </video>
      </section>
      <section>
        <p>Let’s imagine new futures and the strength to bring them to life</p>
      </section>
    </Aside>
  );
};

export default ProjectAside;

const Aside = styled.section`
  flex: 2;
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  overflow: hidden;
  z-index: 1;
  & > section {
    width: 50%;
    background-color: #313131;
    display: flex;
    flex-direction: column;
    justify-content: end;

    & > video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(100%);
    }

    & > p {
      padding: 0.5rem;
      font-weight: bold;
      width: 75%;
      max-width: 10rem;
      font-size: clamp(0.5rem, 1vw, 0.75rem);
      color: white;
    }
  }
`;
