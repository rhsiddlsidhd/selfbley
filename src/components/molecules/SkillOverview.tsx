import { motion } from "motion/react";
import React from "react";
import { styled } from "styled-components";

interface Section {
  title: string;
  description: string;
}

interface SkillOverviewProps {
  isSticky: boolean;
  section: Section;
}

const SkillOverview = ({ isSticky, section }: SkillOverviewProps) => {
  return (
    <Container
      $isSticky={isSticky}
      animate={{
        color: isSticky ? "#EA1821" : "rgb(255, 255, 255)",
      }}
    >
      <p>{section.title}</p>
      <p>{section.description}</p>
    </Container>
  );
};

export default SkillOverview;

const Container = styled(motion.div)<{ $isSticky: boolean }>`
  position: relative;
  font-size: clamp(0.25rem, 2vw, 1rem);
  font-weight: bold;
  padding: 1rem 0 0 1rem;
  & > p {
    color: inherit;
  }
`;
