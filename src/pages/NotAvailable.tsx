import styled from "styled-components";

const NotAvailable = () => {
  return (
    <Wrapper>
      <Img src="/assets/commingSoon.jpg" alt="서비스가 준비중입니다." />
    </Wrapper>
  );
};

export default NotAvailable;

const Wrapper = styled.div`
  height: 100vh;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
