import { Route, Routes, useLocation } from "react-router";

import Header from "./layout/Header";
import { AnimatePresence } from "motion/react";
import PageTransition from "./components/template/PageTransition";
import FlipTransition from "./components/template/FlipTransition";
import BookPage from "./pages/BookPage";

import TheSkills from "./pages/TheSkills";
import TheProjects from "./pages/TheProjects";

import Main from "./pages/Main";

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
                {/* <ContactSection /> */}
                <div>123</div>
              </PageTransition>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
