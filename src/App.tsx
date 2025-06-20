import { Route, Routes, useLocation } from "react-router";
import { Suspense, lazy } from "react";
import Header from "./layout/Header";

import LoadingContainer from "./components/organism/LoadingContainer";
import { AnimatePresence } from "motion/react";
import PageTransition from "./components/template/PageTransition";
import FlipTransition from "./components/template/FlipTransition";
const Main = lazy(() => import("./pages/Main"));
const NotAvailablePage = lazy(() => import("./pages/NotAvailable"));
const TheSkills = lazy(() => import("./pages/TheSkills"));
const TheProjects = lazy(() => import("./pages/TheProjects"));
const ContactSection = lazy(
  () => import("./components/organism/ContactSection")
);

function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingContainer />}>
      <AnimatePresence mode="sync">
        <Routes location={location} key={location.pathname}>
          <Route element={<Header />}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Main />
                </PageTransition>
              }
            />
            <Route path="/not-abailable" element={<NotAvailablePage />} />
            <Route
              path="/skills"
              element={
                <FlipTransition color="#6e6d6d" count={4}>
                  <TheSkills />
                </FlipTransition>
              }
            />
            <Route
              path="/projects"
              element={
                <FlipTransition color="#ffd34f" count={6}>
                  <TheProjects />
                </FlipTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <ContactSection />
                </PageTransition>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default App;
