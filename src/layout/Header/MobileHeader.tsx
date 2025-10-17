import { useState } from "react";
import Logo from "../../components/organism/Logo";

import styled from "styled-components";
import { motion } from "motion/react";
import { CloseIcon, HamburgerIcon } from "../../components/atoms/Icon";

import Nav from "../../components/molecules/Nav";
import FixedButton from "../../components/molecules/FixedButton";

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
        onCloseMenu={() => setIsOpen(false)}
      />
      <MobileNavContainer
        initial={{ opacity: 0, y: "-100%" }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
      >
        <Nav onCloseMenu={() => setIsOpen(false)} />
      </MobileNavContainer>
      <FixedButton onClick={() => setIsOpen(!isOpen)} $bottom="2rem">
        {isOpen ? <CloseIcon color="white" /> : <HamburgerIcon color="white" />}
      </FixedButton>
    </div>
  );
};

export default MobileHeader;

const MobileNavContainer = styled(motion.div)`
  position: fixed;
  padding-top: 8rem;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.COLORS.black};
  z-index: 50;
`;
