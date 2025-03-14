import { Route, Routes } from "react-router";

import Skills from "./pages/Skills";
import Header from "./widgets/ui/Header";
import NotAvailablePage from "./pages/NotAvailable";
import Projects from "./pages/Projects";
import Career from "./pages/Career";
import Main from "./pages/Main";

function App() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<Main />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/not-abailable" element={<NotAvailablePage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="career" element={<Career />} />
      </Route>
    </Routes>
  );
}

export default App;
