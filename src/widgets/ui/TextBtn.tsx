import styled from "styled-components";
import { BtnProps } from "../model/models";

const TextBtn = ({ children, onClick }: BtnProps) => {
  return <Btn onClick={onClick}>{children}</Btn>;
};

export default TextBtn;

const Btn = styled.button`
  border: none;
  background-color: transparent;
  width: 100%;
  color: ${(props) => props.theme.colors.mint};
  font-size: ${(props) => props.theme.fontSize.xl};
  &:hover {
    cursor: pointer;
  }
`;
