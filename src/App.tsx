import { Route, Routes } from "react-router";

import Header from "./layout/Header";
import NotAvailablePage from "./pages/NotAvailable";
import TheProjects from "./pages/TheProjects";

import Main from "./pages/Main";
import TheSkills from "./pages/TheSkills";

import ContactSection from "./components/organism/ContactSection";

function App() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<Main />} />
        <Route path="/not-abailable" element={<NotAvailablePage />} />
        <Route path="/skills" element={<TheSkills />} />
        <Route path="/projects" element={<TheProjects />} />
        <Route path="/contact" element={<ContactSection />} />
      </Route>
    </Routes>
  );
}

export default App;
