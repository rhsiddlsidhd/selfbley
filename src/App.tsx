import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import BookPage from "./pages/BookPage";
import ContactSection from "./components/template/section/ContactSection";
import Header from "./layout/Header/index";
import TreeJsPage from "./pages/ThreeJsPage";
import OpacityTransition from "./components/transition/OpacityTransition";
import FlipTransition from "./components/transition/FilpTrnasition";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route element={<Header />}>
          <Route
            path="/"
            element={
              <OpacityTransition>
                <HomePage />
              </OpacityTransition>
            }
          />
          <Route
            path="book"
            element={
              <OpacityTransition>
                <BookPage />
              </OpacityTransition>
            }
          />
          <Route path="/threeJs" element={<TreeJsPage />} />
          <Route
            path="/projects"
            element={
              <FlipTransition color="#ffd34f" count={6}>
                <ProjectsPage />
              </FlipTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <OpacityTransition>
                <ContactSection />
              </OpacityTransition>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
