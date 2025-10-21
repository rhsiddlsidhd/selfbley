import styled from "styled-components";
import Memo from "../../atoms/Memo";
import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const memoConfig = [
  {
    top: 20,
    left: 1,
  },
  {
    top: 20,
    left: 3,
  },
  { top: 0, left: 1 },
];

export const faqList: FAQ[] = [
  {
    question: "어떻게 개발에 입문하게 되었는가?",
    answer:
      "유튜브에서 웹 개발자가 로그인 기능을 구현하는 영상을 보며 코딩에 관심을 가지게 되었다. 그러한 관심이 추후에 부트캠프를 시작으로 코딩이라는 세계에 입문하게 되었다.",
  },
  {
    question: "개발을 배우기 위해 어떤 노력을 하였는가?",
    answer:
      "개발 관련 책들을 많이 보는 편이다. 기술에 대한 공식 문서 또는 블로그도 참고하지만, 검색으로 단편적인 답을 얻는 것보다 책을 통해 흐름과 맥락을 함께 파악하고 이해하려고 한다",
  },
  {
    question: "개발자로서 어떤 가치를 중요하게 생각하는가 ?",
    answer:
      "개발은 하나의 문제에 대해 다양한 풀이가 존재하는 분야라고 생각한다. 정해진 정답이 있는 것이 아니라, 당시의 상황과 맥락에 따라 최선의 해법이 달라질 뿐, 시간이 지나면 더 나은 해법이 등장하기도 한다. 이처럼 다양한 관점이 충돌할 수 있는 환경 속에서, 중요한 가치는 최선을 찾아가는 협업의 태도라고 생각하고 있다.",
  },
];

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
