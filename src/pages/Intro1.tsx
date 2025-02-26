import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import comingSoonImage from "@assets/commingSoon.jpg";
import { debounce } from "lodash";

interface PreviewValues {
  id: string;
  imageUrl: string;
  thumnail?: string;
  detail?: string;
}

interface PreviewData {
  readonly programming: PreviewValues;
  readonly feature: PreviewValues;
  readonly architecture: PreviewValues;
}

interface ActivatePreviewProps {
  e: React.MouseEvent<HTMLSpanElement>;
  data: PreviewData;
}

interface SetStateActions<T> {
  dispatch: { [K in keyof T]: T[K] };
}

interface ActivatePreviewDispatch {
  setPreview: React.Dispatch<React.SetStateAction<PreviewValues[]>>;
  setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
}

type ActivatePreview = ActivatePreviewProps &
  SetStateActions<ActivatePreviewDispatch>;

type InActivatePreview = SetStateActions<InActivatePreviewDispatch>;
type HandleAnimationEnd = SetStateActions<HandleAnimationEndDispatch>;
interface InActivatePreviewDispatch {
  setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
  setAnimationProgress: React.Dispatch<React.SetStateAction<boolean>>;
}

interface HandleAnimationEndDispatch {
  setPreview: React.Dispatch<React.SetStateAction<PreviewValues[]>>;
  setAnimationProgress: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TransformDataToMap {
  id: keyof PreviewData;
  data: PreviewData;
}

const Intro1 = () => {
  const [isView, setIsView] = useState<boolean>(false);
  const [preview, setPreview] = useState<PreviewValues[]>([]);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [animationProgress, setAnimationProgress] = useState<boolean>(false);

  const words = ["C", "L", "I", "C", "K"];

  const activateView = (
    setIsView: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsView(true);
  };

  const transformDataToMap = ({
    id,
    data,
  }: TransformDataToMap): PreviewValues[] => {
    const result: PreviewValues[] = [];
    result.push(data[id]);
    return result;
  };

  const previewData: PreviewData = {
    programming: {
      id: "programming",
      imageUrl: `${comingSoonImage}`,
      thumnail: `순수함수 \n 불변성 \n 일급함수`,
      detail: "얄라리얄라얄라숑얄라",
    },
    feature: {
      id: "feature",
      imageUrl: `${comingSoonImage}`,
      thumnail: `로그인 썸네일`,
      detail: "localStorage sesscionStorage",
    },
    architecture: {
      id: "architecture",
      imageUrl: `${comingSoonImage}`,
      thumnail: `기능 과 구조 중에 구조에 해당한다`,
      detail: "서랍정리와 같은 일",
    },
  };

  const isValidPreviewKey = (key: string): key is keyof PreviewData => {
    return Object.keys(previewData).includes(key);
  };

  const activatePreview = ({ e, data, dispatch }: ActivatePreview) => {
    if (e.target instanceof HTMLElement) {
      const id = e.target.id;

      if (isValidPreviewKey(id)) {
        const { setPreview, setIsHover } = dispatch;
        setPreview(transformDataToMap({ id, data }));
        setIsHover(true);
      }
    }
  };

  const debounceActivatePreview = debounce(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      activatePreview({
        e,
        data: previewData,
        dispatch: { setPreview, setIsHover },
      });
    },
    1000
  );

  const inActivatePreview = ({ dispatch }: InActivatePreview) => {
    const { setIsHover, setAnimationProgress } = dispatch;
    setIsHover(false);
    debounceActivatePreview.cancel();
    setAnimationProgress(true);
  };

  const handleAnimationEnd = ({ dispatch }: HandleAnimationEnd) => {
    if (isHover || !animationProgress) return;
    const { setPreview, setAnimationProgress } = dispatch;
    setPreview([]);
    setAnimationProgress(false);
  };

  return (
    <>
      <SectionContainer $Intro={true}>
        <Wrapper onAnimationEnd={() => activateView(setIsView)}>
          <Back>FRONT END</Back>
          <Title>
            프론트 엔드 개발자 <span>신영재</span> 입니다.
          </Title>
          {isView && (
            <>
              <Introduction>
                <span
                  id="programming"
                  onMouseEnter={debounceActivatePreview}
                  onMouseLeave={() =>
                    inActivatePreview({
                      dispatch: { setIsHover, setAnimationProgress },
                    })
                  }
                >
                  Function을 Function 답게 프로그래밍(FP)
                </span>{" "}
                지향하는 FRONT ENGINEER 신영재 입니다.{" "}
                <span
                  id="feature"
                  onMouseEnter={debounceActivatePreview}
                  onMouseLeave={() =>
                    inActivatePreview({
                      dispatch: { setIsHover, setAnimationProgress },
                    })
                  }
                >
                  로그인 기능
                </span>
                을 개발을 시작으로 현재는 가 프로젝트의 맞는 디자인 패턴과{" "}
                <span
                  id="architecture"
                  onMouseEnter={debounceActivatePreview}
                  onMouseLeave={() =>
                    inActivatePreview({
                      dispatch: { setIsHover, setAnimationProgress },
                    })
                  }
                >
                  아키텍쳐
                </span>
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

        {(isHover || animationProgress) &&
          preview.map(({ id, thumnail, detail, imageUrl }) => {
            return (
              <Preview
                $isHover={isHover}
                key={id}
                onAnimationEnd={() =>
                  handleAnimationEnd({
                    dispatch: { setPreview, setAnimationProgress },
                  })
                }
              >
                <section>
                  <div className="thumnail">{thumnail}</div>
                  <div className="detail">{detail}</div>
                </section>
                <section>
                  <img src={`${imageUrl}`} alt="이미지" />
                </section>
              </Preview>
            );
          })}
      </SectionContainer>
      <SectionContainer>
        <Skills></Skills>
      </SectionContainer>
    </>
  );
};

export default Intro1;

const slideXIn = keyframes`
    0%{
        transform: translateY(-20%);
        opacity: 0;
    } 

    65%{
        opacity: 0;
    }
    
    100%{
        transform: translateY(0);
        opacity: 1;
    }
`;

const fadeout = keyframes`
    0%{
       scale: 1;
        opacity: 1;
    }
    100%{
        scale: 0.95;
        opacity: 0;
        
    }
`;

const Preview = styled.section<{ $isHover: boolean }>`
  height: 45vh;
  display: flex;
  flex-direction: column;
  color: white;
  & > section {
    display: flex;
    flex: 1;
    width: 1024px;
    min-height: 0;
    .thumnail {
      flex: 0.5;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: ${(props) => props.theme.fontSize.xl};
      white-space: pre-line;
    }
    .detail {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: ${(props) => props.theme.fontSize.l};
    }
  }
  img {
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
    object-fit: cover;
  }
  /* animation: ${({ $isHover }) => ($isHover ? slideXIn : fadeout)} 0.5s
    ease-out; */

  animation: ${({ $isHover }) =>
    $isHover
      ? css`
          ${slideXIn} 0.8s ease-in-out
        `
      : css`
          ${fadeout} 1s ease-in-out
        `};
  opacity: ${({ $isHover }) => ($isHover ? 1 : 0)};
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
  z-index: 3;
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: ${(props) => props.$Intro && "sticky"};
  top: 0;
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
