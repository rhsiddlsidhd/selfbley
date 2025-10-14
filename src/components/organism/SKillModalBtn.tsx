import React from "react";

import { styled } from "styled-components";
import { motion } from "motion/react";

import useScreenStore from "../../stores/useScreenStore";
import { PlusIcon } from "../atoms/Icon/index";

// ViewAllBtn 의 사이즈가 font 사이즈보다 작을떄는 Icon으로 대체
const SKillModalBtn = React.memo(
  ({ isSticky, isModal }: { isSticky: boolean; isModal: () => void }) => {
    const mode = useScreenStore((state) => state.mode);
    return (
      <ViewAllBtn
        initial={{ x: "50%", y: "-50%", opacity: 0 }}
        animate={{
          opacity: isSticky ? 1 : 0,
          x: mode === "mobile" ? 0 : "50%",
        }}
        whileHover={{ x: mode === "mobile" ? 0 : 0 }}
        whileTap={{ scale: 0.95 }}
        onClick={isModal}
      >
        <PlusIcon />
      </ViewAllBtn>
    );
  }
);

export default SKillModalBtn;

const ViewAllBtn = styled(motion.button)`
  width: calc(100% / 6 * 0.25);
  height: 50%;
  background-color: #ff6a41;
  position: absolute;
  top: 50%;
  right: 0;
  border-radius: 10px 0 0 10px;
  cursor: pointer;
`;
