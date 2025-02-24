import { useState } from "react";
import styled, { keyframes } from "styled-components";
import transform from "./../../node_modules/css-to-react-native/index.d";

interface PreviewValues {
  text: string;
  enter?: (id: string) => void;
  leave?: (id: string) => void;
}

interface Preview {
  programming: PreviewValues;
  feature: PreviewValues;
  architecture: PreviewValues;
}
interface PreviewState {
  programming: boolean;
  feature: boolean;
  architecture: boolean;
}

const Intro1 = () => {
  const [isView, setIsView] = useState<boolean>(false);
  const [isPreviews, setIsPreviews] = useState<PreviewState>({
    programming: false,
    feature: false,
    architecture: false,
  });

  const words = ["C", "L", "I", "C", "K"];
  const handleIsMount = () => {
    setTimeout(() => {
      setIsView(true);
    }, 500);
  };
  const handleMouseEnter = (id: string) => {
    setIsPreviews((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const handleMouseLeave = (id: string) => {
    setIsPreviews((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const preview: Preview = {
    programming: {
      text: "Function을 Function 답게 프로그래밍(FP)",
      enter: handleMouseEnter,
      leave: handleMouseLeave,
    },
    feature: {
      text: "로그인 기능",
      enter: handleMouseEnter,
      leave: handleMouseLeave,
    },

    architecture: {
      text: "아키텍쳐",
      enter: handleMouseEnter,
      leave: handleMouseLeave,
    },
  };

  return (
    <>
      <SectionContainer $Intro={true}>
        <Wrapper onAnimationEnd={handleIsMount}>
          <Back>FRONT END</Back>
          <Title>
            프론트 엔드 개발자 <span>신영재</span> 입니다.
          </Title>
          {isView && (
            <>
              <Introduction>
                {Object.entries(preview)
                  .filter(([key]) => key === "programming")
                  .map(([key, value]) => {
                    const { text, enter, leave } = value;
                    return (
                      <span
                        onMouseEnter={() => enter(key)}
                        onMouseLeave={() => leave(key)}
                        key={key}
                      >
                        {text}
                      </span>
                    );
                  })}{" "}
                지향하는 FRONT ENGINEER 신영재 입니다.{" "}
                {Object.entries(preview)
                  .filter(([key]) => key === "feature")
                  .map(([key, value]) => {
                    const { text, enter, leave } = value;
                    return (
                      <span
                        onMouseEnter={() => enter(key)}
                        onMouseLeave={() => leave(key)}
                        key={key}
                      >
                        {text}
                      </span>
                    );
                  })}
                을 개발을 시작으로 현재는 각 프로젝트의 맞는 디자인 패턴과{" "}
                {Object.entries(preview)
                  .filter(([key]) => key === "architecture")
                  .map(([key, value]) => {
                    const { text, enter, leave } = value;
                    return (
                      <span
                        onMouseEnter={() => enter(key)}
                        onMouseLeave={() => leave(key)}
                        key={key}
                      >
                        {text}
                      </span>
                    );
                  })}
                에 높은 관심을 가지고 개발을 진행 중에 있습니다.
                {words.map((word, index) => {
                  return (
                    <Bounde key={index} $delay={`${index * 0.1}s`}>
                      {word}
                    </Bounde>
                  );
                })}
              </Introduction>
            </>
          )}
        </Wrapper>
        <Preview>
          <Card></Card>
        </Preview>
      </SectionContainer>
      <SectionContainer>
        <Skills></Skills>
      </SectionContainer>
    </>
  );
};

export default Intro1;

const Card = styled.div``;
const Preview = styled.section`
  border: 3px solid white;
  height: 50vh;
  display: flex;
`;

const bounce = keyframes`
  0%, 50%, 100% { 
    transform: translateY(1rem);
  }
  25% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-1px);
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

const Skills = styled.div`
  height: 100vh;
  background-color: #868484;
  border-top-left-radius: 2%;
  border-top-right-radius: 2%;
  z-index: 2;
`;

const slideIn = keyframes`
    0%{
        opacity: 0;
        transform:  translateY(50%);
    }
    50%{
        opacity: 0;
        transform:  translateY(50%);
    }
    70%{
        opacity: 1;
        transform:  translateY(0);
    }
`;

const textScale = keyframes`
    0%{ 
        
        opacity   :0;
    }
    35%{
        transform: scale(1.5);
        opacity   :0.5;
        
    }
    60%{
        opacity: 1;
    }
    70%{
        transform: scale(1.5);
        
    }
    100%{
        transform: scale(1.0);
    }
`;

const animationY = keyframes`
    
0%{
    transform: translateY(50%);
}
 70%{
    transform: translateY(50%);
 }
100%{
    transform: translateY(0);
}
`;

const Wrapper = styled.div`
  color: white;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  & > p {
    position: absolute;
  }
  animation: ${animationY} 5s forwards;
`;

const Back = styled.p`
  top: 33%;
  color: #8b87875a;
  font-size: 10rem;
  animation: ${slideIn} 5s forwards;
`;

const Title = styled.p`
  font-size: 3rem;
  color: white;
  top: 50%;
  & > span {
    text-decoration: underline;
    font-weight: bold;
  }
  z-index: 1;
  animation: ${textScale} 5s forwards;
`;

const SectionContainer = styled.section<{ $Intro?: boolean }>`
  display: flex;
  position: ${(props) => props.$Intro && "sticky"};
  flex-direction: column;
  top: 0;
  height: 100vh;
`;

const opacityIntro = keyframes`
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
`;

const Introduction = styled.p`
  font-size: ${(props) => props.theme.fontSize.m};
  color: ${(props) => props.theme.colors.lightGray};
  width: 80%;
  bottom: 15%;
  & > span {
    display: inline-block;
    text-decoration: underline;
    font-weight: bold;
    font-size: ${(props) => props.theme.fontSize.l};
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
      background-color: black;
      color: ${(props) => props.theme.colors.white};
      transition: transform 1.5s, color 1s;
    }
  }
  animation: ${opacityIntro} 1.5s ease-in forwards;
`;
