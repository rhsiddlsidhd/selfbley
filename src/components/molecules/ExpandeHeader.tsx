import styled from "styled-components";
import Nav from "../atoms/Nav";
import Logo from "../organism/Logo";

const ExpandeHeader = () => {
  return (
    <NavWrapper>
      <Logo
        styles={`position:relative; display:flex; justify-content: center;`}
      />
      <Nav />
    </NavWrapper>
  );
};

export default ExpandeHeader;

const NavWrapper = styled.header`
  width: 100%;
  padding: 0.5rem 0;
  position: fixed;
  display: flex;
  background-color: #1b19176f;
  backdrop-filter: blur(2px);
  & > a {
    flex: 1;
    & p {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
  & > a:first-child,
  a:last-child {
    flex: 0.5;
  }
  z-index: 99;
`;
