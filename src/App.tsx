import { Route, Routes, useLocation } from "react-router";

import { AnimatePresence } from "motion/react";
import PageTransition from "./components/template/PageTransition";
import FlipTransition from "./components/template/FlipTransition";
import BookPage from "./pages/BookPage";
import TheProjects from "./pages/TheProjects";
import Main from "./pages/Main";
import ContactSection from "./components/template/section/ContactSection";
import Header from "./layout/Header/index";
import TreeJsPage from "./pages/ThreeJsPage";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence>
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
          <Route
            path="book"
            element={
              <PageTransition>
                <BookPage />
              </PageTransition>
            }
          />
          <Route path="/threeJs" element={<TreeJsPage />} />
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
  );
}

export default App;
