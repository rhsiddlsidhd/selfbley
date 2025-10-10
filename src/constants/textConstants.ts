type Range<
  N extends number,
  Result extends number[] = []
> = Result["length"] extends N
  ? Result[number]
  : Range<N, [...Result, Result["length"]]>;

interface Question {
  id: string;
  question: string;
  style: {
    top: Exclude<Range<81>, Range<10>>;
    left: 1 | 3;
  };
}

export type Questions = Question[];

export const QUESTIONS: Questions = [
  {
    // 어떻게 개발에 입문하게 되었는가 ?
    id: "tennis-0",
    question:
      "유튜브에서 웹 개발자가 로그인 기능을 구현하는 영상을 보며 코딩에 관심을 가지게 되었다. 그러한 관심이 추후에 부트캠프를 시작으로 코딩이라는 세계에 입문하게 되었다.",

    style: {
      top: 10,
      left: 1,
    },
  },
  {
    //좋은 코드들을 보고, 많은 웹들을 접하는 것이 곧 자산이 된다 라는 생각을 바탕으로, 현재는 독서를 통해 코드들을 리뷰하며, 많은 웹들을 접하여 디자인 트랜드를 읽고 있습니다.
    //개발을 배우기 위해 어떤 노력을 하였는가 ?
    id: "tennis-1",
    question:
      "개발 관련 책들을 많이 보는 편이다. 기술에 대한 공식 문서 또는 블로그도 참고하지만, 검색으로 단편적인 답을 얻는 것보다 책을 통해 흐름과 맥락을 함께 파악하고 이해하려고 한다.",

    style: {
      top: 30,
      left: 3,
    },
  },
  {
    // 개발자는 문제를 분석하고 해결하여 코드로 옮겨 적는것이다. 오늘도 문제를 분석하면서 해결하고 있습니다.
    //개발자로서 어떤 가치를 중요하게 생각하는가
    id: "tennis-2",
    question:
      "개발은 하나의 문제에 대해 다양한 풀이가 존재하는 분야라고 생각한다. 정해진 정답이 있는 것이 아니라, 당시의 상황과 맥락에 따라 최선의 해법이 달라질 뿐, 시간이 지나면 더 나은 해법이 등장하기도 한다. 이처럼 다양한 관점이 충돌할 수 있는 환경 속에서, 중요한 가치는 최선을 찾아가는 협업의 태도라고 생각하고 있다. ",

    style: {
      top: 10,
      left: 1,
    },
  },
];

export const BOOKINTRO =
  "개발과 관련된 지식들을 책을 통해 간접 경험하며 배워왔습니다. 해당 섹션에서는 그동안 읽어온 개발 서적들을 소개합니다.";

export const logo = "portfolio" as const;
