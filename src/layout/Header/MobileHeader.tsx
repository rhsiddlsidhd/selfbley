import React, { useState } from "react";
import Logo from "../../components/organism/Logo";
import Nav from "../../components/atoms/Nav";
import styled from "styled-components";
import { motion } from "motion/react";
import { HamburgerIcon } from "../../components/atoms/Icon";
import Button from "../../components/atoms/Button";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Logo
        style={{
          position: "fixed",
          top: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <MobileNavContainer
        style={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : "-100%" }}
      >
        <Nav />
      </MobileNavContainer>
      <div
        style={{
          position: "fixed",
          width: "3rem",
          aspectRatio: "1/1",
          bottom: "2rem",
          right: "1rem",
          zIndex: 100,
        }}
      >
        <Button $borderRadiuse={50} onClick={() => setIsOpen(!isOpen)}>
          <HamburgerIcon />
        </Button>
      </div>
    </div>
  );
};

export default MobileHeader;

const MobileNavContainer = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  border: 3px solid red;
`;
