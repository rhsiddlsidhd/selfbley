import styled from "styled-components";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

const TheSkills = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <button
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        onClick={() => navigate("/not-abailable")}
      >
        <h1>다음페이지</h1>
      </button>
      <button
        style={{
          position: "absolute",
          top: "70%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        onClick={() => navigate("/contact")}
      >
        <h1>contact</h1>
      </button>
      <Text>이건 Skills 페이지 텍스트입니다.</Text>
    </Container>
  );
};

export default TheSkills;

const Container = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #a0d2eb;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Text = styled.div`
  font-size: 2rem;
  color: white;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
`;
