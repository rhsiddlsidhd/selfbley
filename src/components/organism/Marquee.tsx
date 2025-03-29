import MarqueeText from "../atoms/MarqueeText";
import styled from "styled-components";
import SKILLS from "../../constants/skillsConstants";

const Marquee = () => {
  return (
    <Container>
      <MarqueesWrapper>
        <MarqueeText>
          {SKILLS.BE.map(({ name, icon }) => {
            return <SkillsIcon key={name} src={icon} />;
          })}
        </MarqueeText>
        <MarqueeText deg={-10} reverse>
          {SKILLS.FE.map(({ name, icon }) => {
            return <SkillsIcon key={name} src={icon} />;
          })}
        </MarqueeText>
        <MarqueeText>
          {SKILLS.ETC.map(({ name, icon }) => {
            return <SkillsIcon key={name} src={icon} />;
          })}
        </MarqueeText>
      </MarqueesWrapper>
    </Container>
  );
};
export default Marquee;
const Container = styled.section`
  width: 100%;
  height: 75vh;
  background-color: black;
  overflow-x: hidden;
`;

const MarqueesWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SkillsIcon = styled.img`
  height: clamp(6rem, 6vw, 8rem);
  object-fit: cover;
  margin: 0 1rem;
  filter: drop-shadow(0px 0px 5px rgba(243, 241, 241, 0.836));
`;
