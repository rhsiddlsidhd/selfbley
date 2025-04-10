import { useRef } from "react";
import styled from "styled-components";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

import books from "../assets/books.jpg";
import deep from "../assets/deep.jpg";
import structure from "../assets/structure1.jpg";
import dark from "../assets/dark.jpg";

const sections = ["Section 1", "Section 2", "Section 3", "Section 4"];
const imgs = [books, deep, structure, dark];
const TheSkills = () => {
  return (
    <Container>
      <section>1</section>
      <section className="img">
        {imgs.map((v) => {
          return (
            <Background style={{ backgroundImage: `url(${v})` }}></Background>
          );
        })}
      </section>
    </Container>
  );
};

export default TheSkills;

const Container = styled.div`
  & > section:first-child {
    height: 100vh;
    position: relative;
  }
  .img {
    height: 50vh;
    position: relative;
    border: 3px solid white;
  }
`;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  position: sticky;
`;
