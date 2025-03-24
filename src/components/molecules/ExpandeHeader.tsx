import styled from "styled-components";
import Nav from "../atoms/Nav";

const ExpandeHeader = () => {
  return (
    <NavWrapper>
      <Nav />
    </NavWrapper>
  );
};

export default ExpandeHeader;

const NavWrapper = styled.header`
  width: 100%;
  position: fixed;
  background-color: transparent;
  font-weight: bold;
  display: flex;
  z-index: 20;
  /* background-color: #1b19176f; */
  & > div {
    flex: 1;
    & > p {
      width: fit-content;
    }
  }
  & > div:first-child,
  div:last-child {
    flex: 0.5;
  }
`;
