import { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";

interface IsViewProps {
  topSection: boolean;
  bottomSection: boolean;
}

const Intro = () => {
  const centerRef = useRef(null);
  const bottomRef = useRef(null);
  const [isView, setIsView] = useState<IsViewProps>({
    topSection: false,
    bottomSection: false,
  });

  /**
   * 1. middle x bottom x 상단에 있는 section 보이기 하단에 있는 section 안보이기
   * 2. middle o bottom x 상단,하단에 있는 section 안보이기
   * 3. middle x bottom o 상단에 있는 section 안보이기 하단에 있는 section 보이기
   */
  const handleIsView = ({
    center,
    bottom,
  }: {
    center: boolean;
    bottom: boolean;
  }) => {
    if (!center && !bottom) {
      setIsView({ topSection: true, bottomSection: false });
    } else if (center && !bottom) {
      setIsView({ topSection: false, bottomSection: false });
    } else if (!center && bottom) {
      setIsView({ topSection: false, bottomSection: true });
    }
  };

  useEffect(() => {
    const intersection = new IntersectionObserver((entries) => {
      const newIsView = { center: false, bottom: false };
      entries.forEach((entry) => {
        if (entry.target.id === "center") {
          newIsView.center = entry.isIntersecting;
        } else if (entry.target.id === "bottom") {
          newIsView.bottom = entry.isIntersecting;
        }
      });
      handleIsView(newIsView);
    });
    const centerTarget = centerRef.current;
    const bottomTarget = bottomRef.current;

    if (centerTarget) {
      intersection.observe(centerTarget);
    }
    if (bottomTarget) {
      intersection.observe(bottomTarget);
    }

    return () => {
      if (centerTarget) {
        intersection.unobserve(centerTarget);
      }
    };
  }, []);

  return (
    <Container>
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
      <Hr id="center" ref={centerRef} />
      <Wrapper></Wrapper>
      <Hr id="bottom" ref={bottomRef} />
    </Container>
  );
};

export default Intro;

const Hr = styled.hr`
  color: black;
  border: 1px solid blue;
`;
const Container = styled.section`
  height: 200vh;
`;

const slideRightOut = keyframes`
   0% {
     opacity: 1;
     transform: translateX(0);
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
  height: 50%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  & > section:first-child {
    height: 50%;
    border-bottom: 1px solid ${(props) => props.theme.colors.deepGray};
  }
  & > section:last-child {
    height: 40%;
  }
  .head_title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 3rem;
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
    margin: 0 3rem;
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
