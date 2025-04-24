import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { skillsKeys } from "../../constants/skillsConstants";
import { motion } from "motion/react";

const Test = () => {
  return <Container></Container>;
};

export default Test;

const Container = styled.div`
  background-color: gray;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & > p {
    color: black;
  }
`;
