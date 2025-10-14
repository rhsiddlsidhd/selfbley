import { useEffect } from "react";
import OpacityOverlay from "../overlay/OpacityOverlay";

import { useModalStore } from "../../../stores/modalStore";
import SkillModal from "../SkillModal";

const Modal = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const payload = useModalStore((state) => state.payload);
  const setIsOpen = useModalStore((state) => state.setIsOpen);

  const createModalContent = (payload: unknown) => {
    switch (payload) {
      case "technologys":
        return <SkillModal />;
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
  return <OpacityOverlay>{createModalContent(payload)}</OpacityOverlay>;
};

export default Modal;
