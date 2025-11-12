import styled from "styled-components";
import Marquee from "../../molecules/Marquee/index";
const hashTags = "#주니어 #개발자 #프론트엔드 ";
const hashTagsMind = "#긍정 #성장 #도전 #끈기 #열정 #책임감";
const hashTagsHobby = "#자료구조 #알고리즘 #아키텍쳐 #클린코드";

const HashTagSection = () => {
  return (
    <Container>
      <Marquee text={hashTags} deg={-2} />
      <Marquee text={hashTagsMind} />
      <Marquee text={hashTagsHobby} reverse deg={2} />
    </Container>
  );
};

export default HashTagSection;

const Container = styled.section`
  position: relative;
  min-height: fit-content;
  background-color: black;
  overflow: hidden;
  z-index: 5;
`;
