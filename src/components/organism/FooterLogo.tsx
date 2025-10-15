import { styled } from "styled-components";

const logo = "portfolio";
const FooterLogo = () => {
  return (
    <Container>
      <PaintBackground src="/paint/paint2.svg" alt="이미지" />
      <p>{logo.toUpperCase()}</p>
    </Container>
  );
};

export default FooterLogo;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  & > p {
    font-size: 17.5vw;
    font-weight: bold;
  }
  z-index: 90;
`;

const PaintBackground = styled.img`
  position: absolute;
  width: 50%;
  height: 100%;
  left: 10%;
`;
