import tennis0 from "../assets/tennis0.jpg";
import tennis1 from "../assets/tennis1.jpg";
import tennis2 from "../assets/tennis.2.jpg";

type Range<
  N extends number,
  Result extends number[] = []
> = Result["length"] extends N
  ? Result[number]
  : Range<N, [...Result, Result["length"]]>;

interface Question {
  question: string;
  src: string;
  style: {
    top: Exclude<Range<81>, Range<10>>;
    left: 1 | 3;
  };
}

type Questions = Question[];

export const HOMETITLE = "hello World!";
export const ARROR_ICON = "⋙";

export const QUESTIONS: Questions = [
  {
    question:
      "로그인 기능 개발을 시작으로 웹 개발에 입문하였으며, 현재는 아키텍쳐에 높은 관심을 가지고 개발 진행중입니다.로그인 기능 개발을 시작으로 웹 개발에 입문하였으며, 현재는 아키텍쳐에 높은 관심을 가지고 개발 진행중입니다.로그인 기능 개발을 시작으로 웹 개발에 입문하였으며,",
    src: tennis1,
    style: {
      top: 20,
      left: 1,
    },
  },
  {
    question:
      "좋은 코드들을 보고, 많은 웹들을 접하는 것이 곧 자산이 된다 라는 생각을 바탕으로, 현재는 독서를 통해 코드들을 리뷰하며, 많은 웹들을 접하여 디자인 트랜드를 읽고 있습니다.",
    src: tennis2,
    style: {
      top: 30,
      left: 3,
    },
  },
  {
    question:
      "개발자는 문제를 분석하고 해결하여 코드로 옮겨 적는것이다. 오늘도 문제를 분석하면서 해결하고 있습니다.",
    src: tennis0,
    style: {
      top: 10,
      left: 1,
    },
  },
];

export const BOOKINTRO =
  "독서는 타인의 귀한 경험들을 가장 손쉽게 나의 것으로 만들 수 있는 방법이다. 개발과 관련된 지식들을 책을 통해 간접 경험하며 배워왔습니다. 이 섹션에서는 그동안 읽어온 개발 서적들을 소개합니다.";
