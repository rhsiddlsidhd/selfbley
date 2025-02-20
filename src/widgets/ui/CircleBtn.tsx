import styled from "styled-components";
import { BtnProps } from "../model/models";

const CircleBtn = ({ children, onClick }: BtnProps) => {
  return <Btn onClick={onClick}>{children}</Btn>;
};

export default CircleBtn;

const Btn = styled.button`
  width: 100px;
  height: 100px;
  border: 1px solid white;
  border-radius: 100%;
  background-color: transparent;
  color: ${(props) => props.theme.colors.mint};
  &:hover {
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.colors.lightCyan};
  }
`;
