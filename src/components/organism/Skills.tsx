import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
} from "framer-motion";

import {
  BOOK_SECTION_HEIGHT,
  Book,
  CARD_TOTAL_WIDTH,
  CARD_WRAPPER_GAP,
  CARD_WRAPPER_WIDTH,
  INITIAL_Y_OFFSET,
  books,
} from "./../../constants/booksConstants";
import { BOOKINTRO } from "../../constants/textConstants";
import useScreenStore, { Mode } from "../../stores/useScreenStore";
import { isScrollingBookSection } from "../../utils/calculate";
import BookBackground from "./../atoms/BookBackground";
import { getVisibleBooks } from "../../utils/transform";
import TabletAndDesktop from "../atoms/TabletAndDesktop";
import BookCard from "./../atoms/BookCard";

export interface ExtendedBook extends Book {
  isFirst: boolean;
  isLast: boolean;
}

const Skills = () => {
  /**
   * first bg img
   * transform -50% => 0%
   */

  const containerRef = useRef(null);
  const mode = useScreenStore((state) => state.mode);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [bookData, setBookData] = useState<ExtendedBook[]>([]);
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

  const maxOffsetX = (bookData.length - 1) * CARD_TOTAL_WIDTH;
  const maxOffsetY = bookData.length * BOOK_SECTION_HEIGHT;
  const rawX = useTransform(mid, [0, 1], [0, -maxOffsetX]);
  const initialY = useTransform(initial, [0, 1], [INITIAL_Y_OFFSET, 0]);
  const lastY = useTransform(last, [0, 1], [maxOffsetY - 100, maxOffsetY]);
  const x = useMotionTemplate`${rawX}vw`;
  const initialTranslateY = useMotionTemplate`${initialY}%`;
  const lastTranslateY = useMotionTemplate`${lastY}%`;

  useMotionValueEvent(mid, "change", (latest) => {
    setIsFixed(isScrollingBookSection(latest));

    const offsetX = latest * maxOffsetX;
    const newIndex = Math.min(
      Math.round(offsetX / CARD_TOTAL_WIDTH),
      bookData.length - 1
    );
    setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
  });

  useEffect(() => {
    const result = getVisibleBooks(books, mode, BOOKINTRO).map(
      (item, idx, arr) => ({
        ...item,
        isFirst: idx === 0,
        isLast: idx === arr.length - 1,
      })
    );
    setBookData(result);
  }, [mode]);

  return (
    <Container
      ref={containerRef}
      $totalBooks={bookData.length}
      $bookSectionHeight={BOOK_SECTION_HEIGHT}
    >
      {bookData.map(({ src, isFirst, isLast }, i) => {
        const y = isFixed
          ? "0%"
          : isFirst
          ? initialTranslateY
          : isLast
          ? lastTranslateY
          : "0%";
        return (
          <motion.div
            key={i}
            style={{
              y,
              width: "100%",
              height: "100vh",
              position: isFixed ? "fixed" : "absolute",
              top: 0,
              zIndex: -1,
            }}
            initial={false}
            animate={{ opacity: i === activeIndex ? 1 : 0 }}
          >
            <BookBackground src={src} />
          </motion.div>
        );
      })}
      <StickyArea $mode={mode}>
        {/* 가로스크롤 Content = Intro + 가로스크롤 or 가로스크롤(Intro 포함) */}
        <TabletAndDesktop>
          <SectionIntro>{BOOKINTRO}</SectionIntro>
        </TabletAndDesktop>
        <CardScroller
          $gap={CARD_WRAPPER_GAP}
          style={{ x }}
          $totalBooks={bookData.length}
          $mode={mode}
        >
          {bookData.map((book, idx) => {
            return (
              <SlideContainer key={idx} $width={CARD_WRAPPER_WIDTH}>
                <BookCard book={book} idx={idx} />
              </SlideContainer>
            );
          })}
        </CardScroller>
      </StickyArea>
    </Container>
  );
};

export default Skills;

const Container = styled.section<{
  $totalBooks: number;
  $bookSectionHeight: number;
}>`
  height: ${({ $totalBooks, $bookSectionHeight }) =>
    $totalBooks * $bookSectionHeight}vh;
  width: 100vw;
  position: relative;
`;

const StickyArea = styled.div<{ $mode: Mode }>`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  overflow: hidden;
  ${({ $mode }) =>
    $mode === "mobile" &&
    css`
      padding-top: 6rem;
    `}
`;

const SectionIntro = styled.div`
  max-width: 350px;
  margin-top: 5rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
`;

const CardScroller = styled(motion.div)<{
  $totalBooks: number;
  $mode: Mode;

  $gap: number;
}>`
  width: ${({ $totalBooks }) => $totalBooks * 100}vw;
  height: ${({ $mode }) => ($mode === "mobile" ? "80vh" : "60vh")};
  display: flex;
  gap: ${({ $gap }) => `${$gap}vw`};
  background-color: #00000047;
`;

const SlideContainer = styled.div<{ $width: number }>`
  width: ${({ $width }) => `${$width}vw`};
  min-width: 200px;
  flex-shrink: 0;
  display: flex;
`;

//background 의 setInAcitive 또한 카드의 넓이만큼 이동했을때 변해야한다 .
// 한 화면에 카드를 두장씩 보여주기 위해선 하나의 카드가 100vw 만큼의 넓이를 가져가면 볼 수 없다.
// 하나의 카드가 80vw + gap 15vw 라면 5vw 만큼 다음카드가 보일거고
// background 또한 95vw 만큼 이동시에 바껴야한다.
