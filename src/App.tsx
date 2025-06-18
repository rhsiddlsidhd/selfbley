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
                key="skills"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 5 } }}
                style={{ position: "absolute", width: "100%", height: "100%" }}
              >
                <TheSkills />
              </motion.div>
            }
          />
          <Route
            path="/not-abailable"
            element={
              <motion.div
                key="notavailable"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 1 } }}
                style={{ position: "absolute", width: "100%", height: "100%" }}
              >
                <NotAvailable />
              </motion.div>
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
                style={{ position: "absolute", width: "100%", height: "100%" }}
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
