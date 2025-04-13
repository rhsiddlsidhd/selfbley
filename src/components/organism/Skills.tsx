import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
} from "framer-motion";

import books, { Book, BookInterface } from "./../../constants/booksConstants";
import { BOOKINTRO } from "../../constants/textConstants";
import useScreenStore from "../../stores/useScreenStore";

const sections = ["Section 1", "Section 2", "Section 3", "Section 4"];
type ScrollPhase = "initial" | "mid" | "last";

const Skills = () => {
  /**
   * first bg img
   * transform -50% => 0%
   */

  const CARD_TOTAL_WIDTH = 95;
  const CARD_GAP = 15;
  const CARD_WIDTH = 80;
  const VIEWHEIGHT = 100;
  const containerRef = useRef(null);
  const mode = useScreenStore((state) => state.mode);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [data, setData] = useState<Book[]>([]);
  const { scrollYProgress: initial } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: mid } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: last } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"],
  });

  const maxOffset = (data.length - 1) * CARD_TOTAL_WIDTH; //100
  const maxOffsetY = data.length * VIEWHEIGHT;
  const rawX = useTransform(mid, [0, 1], [0, -maxOffset]);
  const initialY = useTransform(initial, [0, 1], [-50, 0]);

  const lastY = useTransform(last, [0, 1], [maxOffsetY - 100, maxOffsetY]); // 5개면 400 ~ 500
  const x = useMotionTemplate`${rawX}vw`;
  const initialTranslateY = useMotionTemplate`${initialY}%`;
  const lastTranslateY = useMotionTemplate`${lastY}%`;

  const isScrollRange = (n: number) => n > 0 && n < 1;
  const getScrollPhase = (index: number, length: number): ScrollPhase => {
    return index === 0 ? "initial" : index === length - 1 ? "last" : "mid";
  };

  const getTranslateYByStep = (step: ScrollPhase) => {
    if (step === "initial" && !isFixed) return initialTranslateY;
    if (step === "last" && !isFixed) return lastTranslateY;
    return "0%";
  };
  useMotionValueEvent(mid, "change", (latest) => {
    setIsFixed(isScrollRange(latest));

    const offsetX = latest * maxOffset;
    const newIndex = Math.min(
      Math.round(offsetX / CARD_TOTAL_WIDTH),

      data.length - 1
    );
    setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
  });

  useEffect(() => {
    const result =
      mode !== "mobile"
        ? books.filter((book) => book.description !== BOOKINTRO)
        : books;
    setData(result);
  }, [mode]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Container ref={containerRef} $totalBooks={data.length}>
      {data.map(({ src }, i, arr) => {
        const step = getScrollPhase(i, arr.length);
        const y = getTranslateYByStep(step);
        return (
          <Background
            key={i}
            source={src}
            isFixed={isFixed}
            animate={{
              opacity: i === activeIndex ? 1 : 0,
            }}
            style={{ y }}
            initial={false}
          />
        );
      })}
      <StickyArea>
        {mode !== "mobile" && <SectionIntro>{BOOKINTRO}</SectionIntro>}
        <HorizontalWrapper style={{ x }} $totalBooks={data.length}>
          {data.map(
            ({ title, src, description, formattedDate, isIntro }, i) => {
              return (
                <CardSlot key={i}>
                  <Card>
                    {isIntro ? (
                      <CardBody>
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <h6>{description}</h6>
                        </div>
                      </CardBody>
                    ) : (
                      <CardBody>
                        <div className="meta">
                          <h5 className="index">
                            {mode !== "mobile" ? i + 1 : i}
                          </h5>
                          <h6 className="updated_at">{formattedDate}</h6>
                        </div>
                        <div className="title">
                          <h5>{title}</h5>
                        </div>
                        <div className="description">
                          <p>{description}</p>
                        </div>
                      </CardBody>
                    )}

                    <CardThumbnail>
                      <img src={src} alt="이미지" />
                    </CardThumbnail>
                  </Card>
                </CardSlot>
              );
            }
          )}
        </HorizontalWrapper>
      </StickyArea>
    </Container>
  );
};

export default Skills;

const Background = styled(motion.div)<{ source: string; isFixed: boolean }>`
  position: ${({ isFixed }) => (isFixed ? "fixed" : "absolute")};
  top: 0;
  width: 100%;
  height: 100vh;
  background-image: url(${({ source }) => source});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  z-index: -1;
  filter: blur(0.5rem);
`;

const Container = styled.section<{ $totalBooks: number }>`
  height: ${({ $totalBooks }) => $totalBooks * 100}vh;
  width: 100vw;
  position: relative;
`;

const StickyArea = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SectionIntro = styled.div`
  max-width: 300px;
  margin-top: 5rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
`;

const HorizontalWrapper = styled(motion.div)<{ $totalBooks: number }>`
  width: ${({ $totalBooks }) => $totalBooks * 100}vw;
  height: 60vh; //80vh
  margin-bottom: 3rem;
  display: flex;
  gap: 15vw;
  background-color: #000000b0;
`;

const CardSlot = styled.div`
  width: 80vw;
  min-width: 200px;
  flex-shrink: 0;
  display: flex;
`;

const Card = styled.div`
  min-width: 200px;
  max-width: calc(100vw / 6 * 4);
  aspect-ratio: 3/ 4;
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 1rem;

  &:hover {
    background-color: white;
    p,
    h5,
    h6,
    h4 {
      color: black;
    }
    .meta > .updated_at {
      border-bottom: 1px solid black;
    }
  }
`;

//background 의 setInAcitive 또한 카드의 넓이만큼 이동했을때 변해야한다 .
// 한 화면에 카드를 두장씩 보여주기 위해선 하나의 카드가 100vw 만큼의 넓이를 가져가면 볼 수 없다.
// 하나의 카드가 80vw + gap 15vw 라면 5vw 만큼 다음카드가 보일거고
// background 또한 95vw 만큼 이동시에 바껴야한다.

const CardBody = styled.div`
  height: 60%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  word-break: keep-all;
  .meta {
    flex: 1 0 20%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-shrink: 0;
    & > h5,
    h6 {
      height: 50%;
    }
    .updated_at {
      width: fit-content;
      border-bottom: 1px solid white;
    }
  }
  .title {
    flex: 2 0 30%;
    font-weight: bold;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  .description {
    flex: 3 0 50%;
    font-size: clamp(0.725rem, 2vw, 1.5rem);
  }
`;
const CardThumbnail = styled.div`
  border-radius: 1rem;
  width: 100%;
  height: 40%;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    object-fit: cover;
  }
`;
