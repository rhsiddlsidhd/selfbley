import { Route, Routes } from "react-router";
import Intro from "./pages/Intro";
import Skills from "./pages/Skills";
import Header from "./widgets/ui/Header";
import NotAvailablePage from "./pages/NotAvailable";
import Projects from "./pages/Projects";
import Career from "./pages/Career";
import Intro1 from "./pages/Intro1";

function App() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<Intro />} />
        <Route path="/in" element={<Intro1 />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/not-abailable" element={<NotAvailablePage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="career" element={<Career />} />
      </Route>
    </Routes>
  );
}

export default App;
