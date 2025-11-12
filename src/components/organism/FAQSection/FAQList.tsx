import styled from "styled-components";
import Memo from "../../atoms/Memo";
import { useState } from "react";
import { faqList, memoConfig } from "./constant";

const FAQList = () => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  return (
    <>
      {faqList.map(({ question, answer }, i) => {
        return (
          <MemoContainer key={i}>
            <Memo
              initial={{ opacity: 0 }}
              animate={{ opacity: clickedIndex !== i ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setClickedIndex(i)}
              onMouseLeave={() => setClickedIndex(null)}
              $left={memoConfig[i].left}
              $top={memoConfig[i].top}
            >
              ❓질문 {i + 1} : {question}
            </Memo>
            <Memo
              initial={{ opacity: 0 }}
              animate={{ opacity: clickedIndex === i ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setClickedIndex(i)}
              onMouseLeave={() => setClickedIndex(null)}
              $left={memoConfig[i].left}
              $top={memoConfig[i].top}
              style={{ fontSize: "clamp(0.7rem, 1.34vw, 1.68rem)" }}
            >
              💬 {answer}
            </Memo>
          </MemoContainer>
        );
      })}
    </>
  );
};

export default FAQList;

const MemoContainer = styled.section`
  position: relative;
  height: 100vh;
`;
