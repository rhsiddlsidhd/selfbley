import { Route, Routes } from "react-router";
import { Suspense, lazy } from "react";

import Header from "./layout/Header";
import Main from "./pages/Main";

const NotAvailablePage = lazy(() => import("./pages/NotAvailable"));
const TheSkills = lazy(() => import("./pages/TheSkills"));
const TheProjects = lazy(() => import("./pages/TheProjects"));
const ContactSection = lazy(
  () => import("./components/organism/ContactSection")
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Main />} />
          <Route path="/not-abailable" element={<NotAvailablePage />} />
          <Route path="/skills" element={<TheSkills />} />
          <Route path="/projects" element={<TheProjects />} />
          <Route path="/contact" element={<ContactSection />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
