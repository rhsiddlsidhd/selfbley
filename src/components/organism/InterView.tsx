import { useRef, useState } from "react";
import styled from "styled-components";
import tennis0 from "../../assets/tennis0.jpg";
import tennis1 from "../../assets/tennis1.jpg";
import tennis2 from "../../assets/tennis.2.jpg";
import useScreenStore, { Mode } from "../../stores/useScreenStore";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

const InterView = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const mode = useScreenStore((state) => state.mode);
  const imgs = [`${tennis1}`, `${tennis2}`, `${tennis0}`];
  //background 배경이 될 태그의 transform: translate(0%, value) 값이 0, 0 이 되었을때 해당 div는 fixed로 고정
  // bgimg 컴포넌트가 transfomr(0 , 0) 이 되었을때 담은 div 가 fixed 되어 문제해결
  const containerRef = useRef(null);
  const { scrollYProgress: scrollYProgressStart } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: scrollYProgressEnd } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"],
  });
  const { scrollYProgress: total } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  //프론트 엔드란 한줄요약 => 사용자와 직접적으로 상호 작용하며 View에 생명을 불어넣는다.
  //질문,
  const questions = [
    "로그인 기능 개발을 시작으로 웹 개발에 입문하였으며, 현재는 아키텍쳐에 높은 관심을 가지고 개발 진행중입니다.",
    "좋은 코드들을 보고, 많은 웹들을 접하는 것이 곧 자산이 된다 라는 마인드를 가지고 있으며,  현재는 독서를 통해 코드들을 리뷰하며, 많은 웹들을 접하여 디자인 트랜드를 읽고 있습니다.",
    "개발자는 문제를 분석하고 해결하여 코드로 옮겨 적는것이다. 오늘도 문제를 분석하면서 해결하고 있습니다.",
  ];

  //200vh 에서 50vh 를 내리면 fixed 를하고 그이후 50vh를내리면 이미지가 바뀌고 50vh 를 내리면 다음 이미지가 보이는 컨테이너
  const fixedInY = useTransform(scrollYProgressStart, [0, 1], ["-50%", "0%"]);
  const fixedOutY = useTransform(scrollYProgressEnd, [0, 1], ["0%", "50%"]);

  const isInView = useInView(containerRef, { amount: 0.33 });
  useMotionValueEvent(total, "change", (latest) => {
    const newIndex = Math.min(
      Math.floor(latest * imgs.length),
      imgs.length - 1
    );
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  return (
    <>
      <Container ref={containerRef}>
        <BackgroundWrapper $isInView={isInView} $length={imgs.length}>
          {imgs.map((source, i) => {
            const isFirst = i === 0;
            const isLast = i === imgs.length - 1;
            return (
              <BackgroundImage
                $isInView={isInView}
                style={{
                  backgroundImage: `url(${source})`,
                  y: isFirst ? fixedInY : isLast ? fixedOutY : 0,
                }}
                animate={{
                  opacity: activeIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            );
          })}
        </BackgroundWrapper>
        {questions.map((q, i) => {
          return (
            <PostIts
              key={i}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              <PostIt $mode={mode}>
                <div>Q</div>
                <div>{q}</div>
              </PostIt>
            </PostIts>
          );
        })}
      </Container>
      <section style={{ height: "150vh", backgroundColor: "pink" }}>
        1234
      </section>
    </>
  );
};

export default InterView;
const Container = styled(motion.section)`
  position: relative;
  width: 100%;
  height: 300vh;
`;

const PostIts = styled(motion.section)`
  position: relative;
  height: 100vh;
`;

const PostIt = styled.div<{ $mode: Mode }>`
  position: relative;
  display: flex;
  top: 20%; // 20~ 80
  left: calc(100% / 6); // 6 or 2
  width: ${({ $mode }) =>
    $mode === "desktop" ? `calc(100% / 6)` : `calc(100% / 3)`};
  word-break: keep-all;
  & > div:first-child {
    font-size: ${({ theme }) => theme.fontSize.xl};
    height: fit-content;
    position: absolute;
    padding-right: 1rem;
    transform: translateX(-100%);
  }
  & > div:last-child {
    font-size: ${({ theme }) => theme.fontSize.l};
  }
`;

const BackgroundWrapper = styled(motion.div)<{
  $isInView: boolean;
  $length: number;
}>`
  width: 100%;
  position: ${({ $isInView }) => ($isInView ? "fixed" : "absolute")};
  top: 0;
  left: 0;
  z-index: -1;
`;

const BackgroundImage = styled(motion.div)<{ $isInView: boolean }>`
  width: 100%;
  height: 100vh;
  position: ${({ $isInView }) => ($isInView ? "absolute" : "static")};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  filter: grayscale(80%) brightness(60%);
`;
