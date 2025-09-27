import { styled } from "styled-components";

interface IconProps {
  source: string;
}

const Icon = ({ source = "#" }: IconProps) => {
  return <Img src={source} alt="Tech icon" />;
};

export default Icon;

const Img = styled.img`
  width: 100%;
  height: 100%;
  padding: 0.25rem;
  position: absolute;
  object-fit: cover;
`;
