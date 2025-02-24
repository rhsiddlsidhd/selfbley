import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";

interface IsViewProps {
  topSection: boolean;
  bottomSection: boolean;
}

interface Refs {
  [key: string]:
    | React.RefObject<HTMLDivElement>
    | React.RefObject<number>
    | React.RefObject<null>;
}

interface IntersectionObserverParams {
  entry: IntersectionObserverEntry;
  options?: Refs;
}

interface IntersectionObserver {
  target: HTMLHRElement[];
  callback: ({ entry, options }: IntersectionObserverParams) => void;
  options?: Refs;
}

const Intro = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLHRElement | null>(null);
  const bottomRef = useRef<HTMLHRElement | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [aboutMe, setAboutMe] = useState<boolean>(false);

  const lastScrollYRef = useRef(0);
  const [isView, setIsView] = useState<IsViewProps>({
    topSection: false,
    bottomSection: false,
  });
  console.log(containerRef);
  /**
   * 1. center x bottom x 상단에 있는 section 보이기 하단에 있는 section 안보이기
   * 2. center o bottom x 상단,하단에 있는 section 안보이기
   * 3. center x bottom o 상단에 있는 section 안보이기 하단에 있는 section 보이기
   */

  const handleIsView = ({ entry, options }: IntersectionObserverParams) => {
    if (!options) return;
    const { containerRef, lastScrollYRef } = options;
    if (
      !(containerRef.current && containerRef.current instanceof HTMLDivElement)
    )
      return;

    if (entry.target.id === "top") {
      setIsView((prev) => ({ ...prev, topSection: entry.isIntersecting }));
      lastScrollYRef.current = 0;
    } else {
      setIsView((prev) => ({
        ...prev,
        bottomSection: entry.isIntersecting,
      }));
      lastScrollYRef.current = containerRef.current.scrollHeight;
    }
  };

  console.log(isView);

  const fetchIntersectionObserver = useCallback(
    ({ target, callback, options }: IntersectionObserver) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => callback({ entry, options }));
      });
      target.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    },
    []
  );

  useEffect(() => {
    if (!topRef.current || !bottomRef.current || !containerRef.current) return;
    // topRef.current.scrollIntoView({ behavior: "smooth" }); //새로고침시 최상단으로 이동
    const target = [topRef.current, bottomRef.current];
    const refs = { lastScrollYRef, containerRef };
    const disconnect = fetchIntersectionObserver({
      target,
      callback: handleIsView,
      options: refs,
    });
    return () => disconnect();
  }, [fetchIntersectionObserver]);

  const handleScroll = debounce(() => {
    if (!containerRef.current || !bottomRef.current || !topRef.current) return;
    const currentScrollY = containerRef.current.scrollTop;
    if (currentScrollY > lastScrollYRef.current) {
      console.log("⬇️ 아래로 스크롤 중");
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (currentScrollY < lastScrollYRef.current) {
      console.log("⬆️ 위로 스크롤 중");
      console.log("currentScrollY", currentScrollY);
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, 200);

  const handleTyping = () => {
    setTimeout(() => {
      setIsTyping(true);
    }, 1000);
  };

  const words = ["클", "릭", "클", "릭"];
  const handleBound = () => {
    setAboutMe(!aboutMe);
    console.log("클릭");
  };
  return (
    <Container ref={containerRef} onScroll={handleScroll}>
      <Hr id="top" ref={topRef} />
      <Wrapper $isView={isView}>
        <section className="head_title">
          <HeadTitle $sub>FRONT ENGINEER</HeadTitle>
          <HeadTitle>PORTFOLIO</HeadTitle>
        </section>
        <section className="head_info">
          <HeadName $isView={isView}>YOUNGJAE SHIN</HeadName>
          <HeadDate $isView={isView}>2030.12.12</HeadDate>
        </section>
      </Wrapper>
      <Wrapper>
        <section className="intro_title">
          <p id="intro_message">
            <Typing
              $isTyping={isTyping}
              onClick={handleBound}
              onAnimationEnd={handleTyping}
            >
              안녕하세요.
            </Typing>
            {isTyping &&
              words.map((word, index) => (
                <Bounde key={index} $delay={`${index * 0.1}s`}>
                  {word}
                </Bounde>
              ))}
          </p>
          <p style={{ opacity: aboutMe ? 1 : 0 }} id="intro_about_me">
            <span style={{ textDecoration: "underline" }}>
              Function을 Function 답게 프로그래밍(FP)
            </span>{" "}
            지향하는 FRONT ENGINEER 신영재 입니다. 로그인 기능을 개발을 시작으로
            현재는 각 프로젝트의 맞는 디자인 패턴과 아키텍쳐에 높은 흥미를
            가지고 개발을 진행 중에 있습니다.
          </p>
        </section>
        <section>
          <h3>블로그</h3>
          <h4>깃헙</h4>
          <h4>독서</h4>
        </section>
      </Wrapper>
      <Hr id="bottom" ref={bottomRef} />
    </Container>
  );
};

export default Intro;

const bounce = keyframes`
  0%, 50%, 100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-1rem);
  }
  75% {
    transform: translateY(-1rem);
  }
`;

const Bounde = styled.span<{ $delay: string }>`
  display: inline-block;
  animation: ${bounce} 5s ${(props) => props.$delay} ease infinite;
  background: linear-gradient(
    to bottom right,
    ${(props) => props.theme.colors.deepGray},
    ${(props) => props.theme.colors.lightCyan}
  );
  background-clip: text;
  color: transparent;
`;

const typing = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

const Typing = styled.span<{ $isTyping: boolean }>`
  font-size: ${(props) => props.theme.fontSize.xl};
  color: transparent;
  padding-right: 2px;
  position: relative;
  cursor: pointer;
  &::before {
    content: "안녕하세요.";
    font-size: ${(props) => props.theme.fontSize.xl};
    position: absolute;
    height: 100%;
    top: 0;
    color: white;
    overflow: hidden;
    border-right: ${(props) => (props.$isTyping ? "none" : "1px solid white")};
    animation: ${typing} 2s steps(20);
  }
`;

const Hr = styled.hr`
  width: 100%;
  height: 0.1px;
  background-color: red;
`;

const Container = styled.div`
  height: 200vh;
  overflow: scroll;
  background-color: #6d666786;
`;

const slideRightOut = keyframes`
   0% {
     opacity: 1;
   }

   100% {
     opacity: 0;
     transform: translateX(100%);
   }

`;

const slideLeftIn = keyframes`
 0% {
     opacity: 0;
     transform: translateX(-100%);
   }

   100% {
     opacity: 1;
     transform: translateX(0);
   }
`;
const slideUpIn = keyframes`
  0%{
    opacity: 0;
    transform:  translateY(100%);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideRightIn = keyframes`
  0%{
    opacity: 0;
    transform:  translateX(100%);
  }
  100%{
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideDownOut = keyframes`
  0%{
    opacity: 1;
    transform:  translateY(0);
  }
  100%{
    opacity: 0;
    transform: translateY(100%);
  }

`;

const Wrapper = styled.div<{ $isView?: IsViewProps }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;

  & > section:first-child {
    height: 50vh;
    border-bottom: 1px solid ${(props) => props.theme.colors.deepGray};
    padding: 0 3rem;
  }
  & > section:last-child {
    height: 40vh;
    padding: 0 3rem;
  }
  .head_title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    animation: ${(props) =>
      props.$isView?.topSection
        ? css`
            ${slideLeftIn} 2s
          `
        : css`
            ${slideRightOut} 1s
          `};
    opacity: ${(props) => (props.$isView?.topSection ? 1 : 0)};
  }
  .head_info {
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
  .intro_title {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const HeadTitle = styled.div<{ $sub?: boolean }>`
  font-size: ${(props) => (props.$sub ? "2rem" : "5rem")};
  animation: ${slideLeftIn} 1s;
`;

const HeadName = styled.div<{ $isView?: IsViewProps }>`
  animation: ${(props) =>
    props.$isView?.topSection
      ? css`
          ${slideUpIn} 3s
        `
      : css`
          ${slideDownOut} 1s
        `};
  opacity: ${(props) => (props.$isView?.topSection ? 1 : 0)};
`;

const HeadDate = styled.div<{ $isView?: IsViewProps }>`
  animation: ${slideRightIn} 4s;

  animation: ${(props) =>
    props.$isView?.topSection
      ? css`
          ${slideRightIn} 3s
        `
      : css`
          ${slideRightOut} 1s
        `};
  opacity: ${(props) => (props.$isView?.topSection ? 1 : 0)};
`;
