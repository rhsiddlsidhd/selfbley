// import { Route, Routes, useLocation } from "react-router";
// import { Suspense, lazy } from "react";
// import Header from "./layout/Header";
// import Main from "./pages/Main";
// import LoadingContainer from "./components/organism/LoadingContainer";
// import { AnimatePresence } from "motion/react";
// import { motion } from "motion/react";

// const NotAvailablePage = lazy(() => import("./pages/NotAvailable"));
// const TheSkills = lazy(() => import("./pages/TheSkills"));
// const TheProjects = lazy(() => import("./pages/TheProjects"));
// const ContactSection = lazy(
//   () => import("./components/organism/ContactSection")
// );

// function App() {
//   const location = useLocation();

//   return (
//     <Suspense fallback={<LoadingContainer />}>
//       <AnimatePresence mode="sync">
//         <Routes location={location} key={location.pathname}>
//           <Route element={<Header />}>
//             <Route path="/" element={<Main />} />
//             <Route path="/not-abailable" element={<NotAvailablePage />} />
//             <Route path="/skills" element={<TheSkills />} />
//             <Route path="/projects" element={<TheProjects />} />
//             <Route path="/contact" element={<ContactSection />} />
//           </Route>
//         </Routes>
//       </AnimatePresence>
//     </Suspense>
//   );
// }

// export default App;

import { AnimatePresence, motion } from "motion/react";
import { Routes, Route, useLocation } from "react-router";
import { Suspense, lazy } from "react";
import TheSkills from "./pages/TheSkills";
import NotAvailable from "./pages/NotAvailable";
import ContactSection from "./components/organism/ContactSection";
import styled from "styled-components";

function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimatePresence mode="sync">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/skills"
            element={
              <motion.div
                key="/skills"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.8, transition: { duration: 3 } }}
                style={{ position: "absolute", width: "100%", height: "100%" }}
              >
                <TheSkills />
              </motion.div>
            }
          />
          <Route
            path="/not-abailable"
            element={
              <FlipAnimatedContainer
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {Array.from({ length: 6 }, (_, i) => {
                  const reversedIndex = 6 - 1 - i;
                  const delay = reversedIndex * 0.1;
                  console.log(delay);
                  return (
                    <FlipItem
                      variants={sectionVariants}
                      transition={{
                        duration: 1,
                        type: "tween",
                        ease: "easeIn",
                        delay,
                      }}
                      key={i}
                    ></FlipItem>
                  );
                })}
                <NotAvailable key="/not-abailable" />
              </FlipAnimatedContainer>
            }
          />
          <Route
            path="/contact"
            element={
              <motion.div
                key="contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 1 } }}
              >
                <ContactSection />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default App;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const sectionVariants = {
  hidden: { transform: "scaleX(0)" },
  visible: { transform: "scaleX(1)" },
};

const FlipAnimatedContainer = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  pointer-events: none;
  border: 3px solid blue;
`;

const FlipItem = styled(motion.div)`
  flex: 1;
  border: 1px solid red;

  background-color: #ffd34f;
  transform-origin: right;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
`;
