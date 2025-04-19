import { styled } from "styled-components";

interface Section {
  title: string;
  description: string;
}

interface SkillOverviewProps {
  section: Section;
}

const SkillOverview = ({ section }: SkillOverviewProps) => {
  return (
    <Container>
      <p>{section.title}</p>
      <p>{section.description}</p>
    </Container>
  );
};

export default SkillOverview;

const Container = styled.div`
  position: relative;
  font-size: clamp(0.25rem, 2vw, 1rem);
  font-weight: bold;
  padding: 1rem 0 0 1rem;
  color: inherit;
  & > p {
    color: inherit;
  }
`;
