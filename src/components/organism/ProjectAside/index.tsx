import styled from "styled-components";
import Video from "../../atoms/Video";
import useScreenStore from "../../../stores/screenStore";

const ProjectAside = () => {
  const mode = useScreenStore((state) => state.mode);

  if (mode === "mobile") return null;

  return (
    <Aside>
      <section>
        <Video src={"/video/mapleleaf.webm"} />
      </section>
      <section>
        <p>Let’s imagine new futures and the strength to bring them to life</p>
      </section>
    </Aside>
  );
};

export default ProjectAside;
const Aside = styled.aside`
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
