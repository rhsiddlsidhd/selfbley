import styled from "styled-components";
import Marquee from "../../../molecules/Marquee";

const hashTags = "#주니어 #개발자 #프론트엔드 ";
const hashTagsMind = "#긍정 #성장 #도전 #끈기 #열정 #책임감";
const hashTagsHobby = "#독서 #테니스 #스노우보드 #런닝";

const HashTagSection = () => {
  return (
    <Container>
      <Marquee text={hashTags} />
      <Marquee text={hashTagsMind} />
      <Marquee text={hashTagsHobby} reverse deg={5} />
    </Container>
  );
};

export default HashTagSection;

const Container = styled.section`
  position: relative;
  height: 100vh;
  min-height: fit-content;
  background-color: black;
  overflow: hidden;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
