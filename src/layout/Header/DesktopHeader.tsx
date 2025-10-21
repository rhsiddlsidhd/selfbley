import styled from "styled-components";
import Logo from "../../components/molecules/Logo";
import Nav from "../../components/molecules/Nav";

const DesktopHeader = () => {
  return (
    <Container>
      <Logo
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      />
      <Nav />
    </Container>
  );
};

export default DesktopHeader;

const Container = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  background-color: #1b19176f;
  padding: 0.5rem 0;
  backdrop-filter: blur(2px);

  & p {
    display: flex;
    height: 100%;
    align-items: center;
  }
  & > a:first-child,
  a:last-child {
    flex: 0.5;
  }
  & a {
    flex: 1;
  }
  z-index: 99;
`;
