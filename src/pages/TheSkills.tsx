import styled from "styled-components";
import { motion } from "motion/react";

const TheSkills = () => {
  // const fetchApiHandler = async (query: string) => {
  //   const res = await fetch(
  //     `http://localhost:8080/api/search?q=${encodeURI(query)}`
  //   );

  //   const { data } = await res.json();
  //   const book = data.items[0];

  //   return book;
  // };

  // useEffect(() => {
  //   const fetchPromiseAll = async () => {
  //     const promises = BOOKSTITLE.map((book) => fetchApiHandler(book));
  //     const results = await Promise.all(promises);
  //     console.log("results", results);
  //   };

  //   fetchPromiseAll();
  // }, []);

  return <Container></Container>;
};

export default TheSkills;

const Container = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: rgb(160, 210, 235);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 5;
`;
