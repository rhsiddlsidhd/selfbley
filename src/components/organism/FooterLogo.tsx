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
  ${({ theme }) => theme.FLEX_CENTER}
  position: relative;
  & > p {
    font-size: 17.5vw;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
`;

const PaintBackground = styled.img`
  position: absolute;
  width: 50%;
  height: 100%;
  left: 10%;
`;
