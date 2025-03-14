import styled from "styled-components";

import { Mode } from "./Header";
import Nav from "./Nav";

export interface HeaderProps {
  mode: Mode;
}

const ExpandeHeader = ({ mode }: HeaderProps) => {
  return (
    <HeaderWrapper>
      <Nav mode={mode} id="expand" />
    </HeaderWrapper>
  );
};

export default ExpandeHeader;

const HeaderWrapper = styled.header`
  width: 100%;
  position: fixed;
  background-color: transparent;
  display: flex;
  z-index: 5;
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
