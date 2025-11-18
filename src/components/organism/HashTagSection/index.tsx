import styled from "styled-components";
import Marquee from "../../molecules/Marquee/index";
const hashTags = "#주니어 #개발자 #프론트엔드 ";
const hashTagsMind = "#긍정 #성장 #도전 #끈기 #열정 #책임감";
const hashTagsHobby = "#자료구조 #알고리즘 #아키텍쳐 #클린코드";

const HashTagSection = () => {
  return (
    <Container>
      <Marquee
        fontSize="clamp2"
        text={hashTagsMind}
        reverse
        deg={10}
        bgColor="mint"
      />

      <Marquee
        fontSize="clamp2"
        text={hashTags}
        deg={-20}
        bgColor="lightGray"
      />

      <Marquee
        fontSize="clamp1"
        text={hashTagsHobby}
        reverse
        bgColor="orange"
      />
    </Container>
  );
};

export default HashTagSection;

const Container = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  background-color: black;
  overflow: hidden;
  z-index: 5;
`;
