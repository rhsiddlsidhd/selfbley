import { memo, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import {
  useScroll,
  useInView,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";

import Marquee from "../../molecules/Marquee/index";

import useBookData from "../../../hooks/useBookData";

import useScreenStore, { Mode } from "../../../stores/screenStore";

import SVGContainer from "../../template/container/SVGContainer";
import Sign from "../../atoms/Sign";
import BookList, { CARD_WRAPPER_WIDTH } from "./BookList";
import Background from "./Background";
import { getRandomSignType, getSVGWidth } from "../../../utils";

//background 의 setInAcitive 또한 카드의 넓이만큼 이동했을때 변해야한다 .
// 한 화면에 카드를 두장씩 보여주기 위해선 하나의 카드가 100vw 만큼의 넓이를 가져가면 볼 수 없다.
// 하나의 카드가 80vw + gap 15vw 라면 5vw 만큼 다음카드가 보일거고
// background 또한 95vw 만큼 이동시에 바껴야한다.

export interface BookData {
  author: string;
  description: string;
  discount: string;
  image: string;
  isbn: string;
  link: string;
  pubdate: string;
  publisher: string;
  title: string;
}

const BOOK_SECTION_HEIGHT = 100;
const INITIAL_Y_OFFSET = -100;
const LAST_Y_OFFSET = 100;

const SVGWrapper = memo(({ length }: { length: number }) => {
  const items = useMemo(() => {
    return Array.from({ length }, (_, i) => ({
      top: i % 2 === 0 ? Math.floor(Math.random() * 11) : "auto",
      bottom: i % 2 !== 0 ? Math.floor(Math.random() * 11) : "auto",
      left: (100 / length) * i + Math.random(),
      type: getRandomSignType(),
    }));
  }, [length]);
  console.log(getSVGWidth(0.3));
  return (
    <>
      {items.map((item, i) => (
        <SVGContainer
          $width={getSVGWidth(0.2)}
          style={{
            top: `${item.top}%`,
            bottom: `${item.bottom}%`,
            left: `${item.left}%`,
          }}
          isInView={true}
          key={i}
        >
          <Sign type={item.type} />
        </SVGContainer>
      ))}
    </>
  );
});

const BooksSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: "some" });
  const mode = useScreenStore((state) => state.mode);
  const { bookData } = useBookData();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const y = useTransform(
    scrollYProgress,
    [0, 1 / 6, 5 / 6, 1],
    [`${INITIAL_Y_OFFSET}%`, "0%", "0%", `${LAST_Y_OFFSET}%`]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const normalizedProgress = Math.max(
      0,
      Math.min(1, (latest - 1 / 6) / (4 / 6))
    );

    const offsetX = normalizedProgress * maxOffsetX;
    const newIndex = Math.min(
      Math.round(offsetX / CARD_WRAPPER_WIDTH),
      bookData.length - 1
    );

    setActiveIndex(newIndex);
  });

  const maxOffsetX = (bookData.length - 1) * CARD_WRAPPER_WIDTH;

  const x = useTransform(
    scrollYProgress,
    [1 / 6, 5 / 6],
    ["0vw", `-${maxOffsetX}vw`]
  );

  return (
    <Container
      ref={containerRef}
      $totalBooks={bookData.length}
      $bookSectionHeight={BOOK_SECTION_HEIGHT}
    >
      <Background
        data={bookData}
        y={y}
        activeIndex={activeIndex}
        isInView={isInView}
      />

      <StickyArea $mode={mode}>
        <CardScroller style={{ x }} $totalBooks={bookData.length}>
          <BookList books={bookData} />

          <SVGWrapper length={6} />
        </CardScroller>

        <Title>
          <Marquee text="THE BOOKS" reverse />
        </Title>
      </StickyArea>
    </Container>
  );
};

export default BooksSection;

const Title = styled.div`
  position: sticky;
  bottom: 0;
  z-index: -1;
`;

const Container = styled.section<{
  $totalBooks: number;
  $bookSectionHeight: number;
}>`
  position: relative;
  height: ${({ $totalBooks, $bookSectionHeight }) =>
    $totalBooks * $bookSectionHeight}vh;
  background-color: black;
`;

const StickyArea = styled.div<{ $mode: Mode }>`
  position: sticky;
  height: 100vh;
  top: 0;
  overflow: hidden;
`;

const CardScroller = styled(motion.div)<{
  $totalBooks: number;
}>`
  width: ${({ $totalBooks }) => $totalBooks * 100}vw;
  height: 100%;
  position: relative;
  display: flex;
`;
