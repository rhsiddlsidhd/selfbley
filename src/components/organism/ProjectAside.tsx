import styled from "styled-components";
import forest from "../../assets/209790.mp4";
import useScreenStore from "../../stores/useScreenStore";
const ProjectAside = () => {
  const mode = useScreenStore((state) => state.mode);
  if (mode === "mobile") return null;
  return (
    <Aside>
      <section>
        <video src={forest} autoPlay loop muted />
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

  & > section {
    width: 50%;
    background-color: #313131;
    display: flex;
    flex-direction: column;
    justify-content: end;

    & > video {
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
