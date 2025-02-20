import CircleBtn from "./widgets/ui/CircleBtn";
import { skills } from "./widgets/config/constants";
import TextBtn from "./widgets/ui/TextBtn";

function App() {
  return (
    <>
      {skills.frontend.map((skill) => {
        return <CircleBtn>{skill}</CircleBtn>;
      })}
      {skills.backend.map((skill) => {
        return <CircleBtn>{skill}</CircleBtn>;
      })}
      <TextBtn>버튼이오버튼이오버튼이오버튼이오버튼이오</TextBtn>
    </>
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
