import MarqueeText from "../atoms/MarqueeText";
import styled from "styled-components";
import SKILLS from "../../constants/skillsConstants";

/**
 *
 * icon의 크기
 * wrapper의 최소 높이
 * 위치 벗어나는거 문제 있음
 */

const Marquee = () => {
  return (
    <Container>
      <MarqueesWrapper>
        {/* <MarqueeText>
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
        </MarqueeText> */}
      </MarqueesWrapper>
    </Container>
  );
};
export default Marquee;
const Container = styled.section`
  position: relative;
  width: 100%;
  height: 75vh;
  background-color: black;
  overflow: hidden;
`;

const MarqueesWrapper = styled.div`
  height: 100%;
  display: flex;
  gap: 3rem;
  flex-direction: column;
  justify-content: center;
`;

const SkillsIcon = styled.img`
  height: clamp(2rem, 8vw, 8rem);
  object-fit: cover;
  margin: 0 1rem;
  filter: drop-shadow(0px 0px 5px rgba(243, 241, 241, 0.836));
`;
