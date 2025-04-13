type Range<
  N extends number,
  Result extends number[] = []
> = Result["length"] extends N
  ? Result[number]
  : Range<N, [...Result, Result["length"]]>;

interface Question {
  question: string;
  style: {
    top: Exclude<Range<81>, Range<20>>;
    left: 2 | 6;
  };
}

type Questions = Question[];

export const TEXTS = {
  TITLE: "FRONTEND",
  ARROW_ICON: "⋙",
};

export const QUESTIONS: Questions = [
  {
    question:
      "로그인 기능 개발을 시작으로 웹 개발에 입문하였으며, 현재는 아키텍쳐에 높은 관심을 가지고 개발 진행중입니다.",
    style: {
      top: 20,
      left: 6,
    },
  },
  {
    question:
      "좋은 코드들을 보고, 많은 웹들을 접하는 것이 곧 자산이 된다 라는 생각을 바탕으로, 현재는 독서를 통해 코드들을 리뷰하며, 많은 웹들을 접하여 디자인 트랜드를 읽고 있습니다.",
    style: {
      top: 40,
      left: 2,
    },
  },
  {
    question:
      "개발자는 문제를 분석하고 해결하여 코드로 옮겨 적는것이다. 오늘도 문제를 분석하면서 해결하고 있습니다.",
    style: {
      top: 40,
      left: 6,
    },
  },
];

export const BOOKINTRO =
  "독서는 타인의 귀한 경험들을 가장 손쉽게 나의 것으로 만들 수 있는 방법이다. 저는 개발과 관련된 지식들을 책을 통해 간접 경험하며 배워왔습니다. 이 섹션에서는 그동안 읽어온 개발 서적들을 소개합니다.";
