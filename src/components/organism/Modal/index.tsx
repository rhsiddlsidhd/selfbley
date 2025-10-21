import { useEffect } from "react";
import { useModalStore } from "../../../stores/modalStore";
import TechCategoryList from "../../molecules/TechCategoryList";

import styled from "styled-components";
import useScreenStore, { Mode } from "../../../stores/screenStore";
import { technologys } from "../../../constants/technology";
import { motion } from "motion/react";

const Modal = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const payload = useModalStore((state) => state.payload);
  const setIsOpen = useModalStore((state) => state.setIsOpen);
  const mode = useScreenStore((state) => state.mode);
  const createModalContent = (payload: unknown) => {
    switch (payload) {
      case "technologys":
        return (
          <TechWrapper $mode={mode}>
            <TechCategoryList technologies={technologys} />
          </TechWrapper>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    window.document.body.style.overflow = isOpen ? "hidden" : "auto";
    window.document.addEventListener("mousedown", () => setIsOpen(false, null));

    return () => {
      window.document.body.style.overflow = "auto";
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;
  return <OpacityContainer>{createModalContent(payload)}</OpacityContainer>;
};

export default Modal;

const TechWrapper = styled.div<{ $mode: Mode }>`
  ${({ theme }) => theme.FLEX_CENTER}
  ${({ theme, $mode }) =>
    $mode === "mobile" ? theme.responseWidth(4) : theme.responseWidth(2)}
  background-color: ${({ theme }) => theme.COLORS.yellow};
  padding: 1rem 0.725rem;
  border-radius: 10px;
`;

const OpacityContainer = styled(motion.div)`
  ${({ theme }) => theme.FLEX_CENTER}
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;
