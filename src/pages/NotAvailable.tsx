import { motion } from "motion/react";
import styled from "styled-components";
import useAnimationProgressStore, {
  AnimationType,
} from "../stores/useAnimationProgress";
import SlideInXOverlay from "../components/atoms/SlideInXOverlay";
import { useEffect } from "react";

const NotAvailable = () => {
  const { type, setType } = useAnimationProgressStore();
  useEffect(() => {
    console.log(type);
  }, [type]);

  return (
    // <Wrapper
    // variants={containerVariants}
    // initial="hidden"
    // animate="visible"
    // exit="hidden"
    // $type={type}
    // onAnimationComplete={() => setType("PAGE_TRANSITION")}
    // >
    //   {type === "INITIAL" &&
    //     Array.from({ length: 6 }, (_, i) => (
    //       <motion.div variants={sectionVariants} key={i}>
    //         {i}
    //       </motion.div>
    //     ))}
    //   {type === "PAGE_TRANSITION" && <SlideInXOverlay />}
    //   {type !== "INITIAL" && <h1>ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ</h1>}
    // </Wrapper>
    <>{type === "PAGE_TRANSITION" && <h1>ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ</h1>}</>
  );
};

export default NotAvailable;

const containerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
};

const sectionVariants = {
  hidden: { x: "100%", backgroundColor: "black" },
  visible: {
    x: 0,
    backgroundColor: "#ffd34f",
    transition: { type: "tween", duration: 10 },
  },
};

const Wrapper = styled(motion.div)<{ $type: AnimationType }>`
  position: ${({ $type }) => ($type === "INITIAL" ? "fixed" : "relative")};
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #ffd34f;
`;
