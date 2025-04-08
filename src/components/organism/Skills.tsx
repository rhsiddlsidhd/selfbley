import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import CardSlider from "./CardSlider";
import { motion, useInView } from "motion/react";
import book from "../../assets/books.jpg";
import useScreenStore, { Mode } from "../../stores/useScreenStore";

const Skills = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const mode = useScreenStore((state) => state.mode);
  const isInView = useInView(containerRef, { amount: "all" });
  useEffect(() => {
    console.log(isInView);
  }, [isInView]);

  return <Container ref={containerRef}></Container>;
};

export default Skills;

const Container = styled(motion.section)`
  position: relative;
  width: 100%;
  height: 100vh;
  padding-top: 2rem;
  padding-left: 2rem;
`;
