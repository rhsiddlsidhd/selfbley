import { useEffect } from "react";
import OpacityOverlay from "../overlay/OpacityOverlay";

import { useModalStore } from "../../../stores/modalStore";
import TechCategoryList from "../../molecules/TechCategoryList";
import { technologys } from "../content/TechnologiesContent/constant";
import styled from "styled-components";
import useScreenStore, { Mode } from "../../../stores/useScreenStore";

const Modal = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const payload = useModalStore((state) => state.payload);
  const setIsOpen = useModalStore((state) => state.setIsOpen);
  const mode = useScreenStore((state) => state.mode);
  const createModalContent = (payload: unknown) => {
    switch (payload) {
      case "technologys":
        return <TechCategoryList technologies={technologys} />;
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
  return (
    <OpacityOverlay>
      <ModalContainer $mode={mode}>
        {createModalContent(payload)}
      </ModalContainer>
    </OpacityOverlay>
  );
};

export default Modal;

const ModalContainer = styled.div<{ $mode: Mode }>`
  ${({ theme }) => theme.FLEX_CENTER}
  ${({ theme, $mode }) =>
    $mode === "mobile" ? theme.responseWidth(4) : theme.responseWidth(2)}
  background-color: ${({ theme }) => theme.COLORS.yellow};
  padding: 1rem 0.725rem;
  border-radius: 10px;
`;
