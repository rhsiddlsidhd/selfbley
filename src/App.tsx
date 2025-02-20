import { Route, Routes } from "react-router";
import Intro from "./pages/Intro";
import Skills from "./pages/Skills";
import Header from "./widgets/ui/Header";
import NotAvailablePage from "./pages/NotAvailable";
import Projects from "./pages/Projects";
import Career from "./pages/Career";

function App() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<Intro />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/not-abailable" element={<NotAvailablePage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="career" element={<Career />} />
      </Route>
    </Routes>
  );
}

export default App;

// const slideIn = keyframes`
//   0% {
//     opacity: 0;
//     transform: translateX(-100%);
//   }

//   100% {
//     opacity: 1;
//     transform: translateX(0);
//   }
// `;

// const AnimateTest = styled.div`
//   opacity: 0;
//   transform: translateX(-100%);
//   animation: ${slideIn} 1s ease-out 0.5s forwards;
// `;
