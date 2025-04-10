import { Route, Routes } from "react-router";

import Header from "./layout/Header";
import NotAvailablePage from "./pages/NotAvailable";
import TheProjects from "./pages/TheProjects";

import Main from "./pages/Main";
import TheSkills from "./pages/TheSkills";

function App() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<Main />} />
        <Route path="/not-abailable" element={<NotAvailablePage />} />
        <Route path="/skills" element={<TheSkills />} />
        <Route path="/projects" element={<TheProjects />} />
      </Route>
    </Routes>
  );
}

export default App;
