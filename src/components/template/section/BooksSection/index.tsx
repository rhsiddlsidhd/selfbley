import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
} from "framer-motion";
import useScreenStore, { Mode } from "../../../../stores/useScreenStore";
import {
  BOOK_SECTION_HEIGHT,
  BOOKSTITLE,
  CARD_TOTAL_WIDTH,
  CARD_WRAPPER_GAP,
  CARD_WRAPPER_WIDTH,
  INITIAL_Y_OFFSET,
  LAST_Y_OFFSET,
} from "../../../../constants/booksConstants";
import { isScrollingBookSection } from "../../../../utils/calculation";
import BookBackground from "../../../atoms/BookBackground";
import BookCard from "../../../molecules/BookCard";
import Marquee from "../../../molecules/Marquee";

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

const BooksSection = () => {
  const containerRef = useRef(null);

  const mode = useScreenStore((state) => state.mode);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [bookData, setBookData] = useState<BookData[]>([]);
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

  const rawX = useTransform(mid, [0, 1], [0, -maxOffsetX]);

  const rawY = useTransform(mid, [0, 1], [0, 0]);

  const initialY = useTransform(initial, [0, 1], [INITIAL_Y_OFFSET, 0]);

  const lastY = useTransform(last, [0, 1], [0, LAST_Y_OFFSET]);
  const x = useMotionTemplate`${rawX}vw`;
  const initialTranslateY = useMotionTemplate`${initialY}%`;
  const lastTranslateY = useMotionTemplate`${lastY}%`;
  const generalY = useMotionTemplate`${rawY}%`;

  useMotionValueEvent(mid, "change", (latest) => {
    setIsFixed(isScrollingBookSection(latest));

    const offsetX = latest * maxOffsetX;
    const newIndex = Math.min(
      Math.round(offsetX / CARD_TOTAL_WIDTH),
      bookData.length - 1
    );

    setActiveIndex(newIndex);
  });

  const fetchApiHandler = async (query: string) => {
    const BASE_URL =
      import.meta.env.MODE === "development"
        ? "http://localhost:8080"
        : import.meta.env.VITE_DEPLOY_URL;

    const res = await fetch(`${BASE_URL}/api/search?q=${encodeURI(query)}`);

    const { data } = await res.json();
    const book = data.items[0];

    return book;
  };

  useEffect(() => {
    const fetchPromiseAll = async () => {
      const promises = BOOKSTITLE.map((book) => fetchApiHandler(book));
      const results = await Promise.all(promises);
      setBookData(results);
    };

    fetchPromiseAll();
  }, []);

  return (
    <Container
      ref={containerRef}
      $totalBooks={bookData.length}
      $bookSectionHeight={BOOK_SECTION_HEIGHT}
    >
      <BookBackground
        data={bookData}
        isFixed={isFixed}
        activeIndex={activeIndex}
        initialTranslateY={initialTranslateY}
        lastTranslateY={lastTranslateY}
        generalY={generalY}
      />
      <StickyArea $mode={mode}>
        <CardScroller
          $gap={CARD_WRAPPER_GAP}
          style={{ x }}
          $totalBooks={bookData.length}
        >
          {bookData.map((book, idx) => {
            return (
              <SlideContainer key={idx} $width={CARD_WRAPPER_WIDTH}>
                <BookCard book={book} idx={idx} />
              </SlideContainer>
            );
          })}
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
  $gap: number;
}>`
  width: ${({ $totalBooks }) => $totalBooks * 100}vw;
  height: 100%;
  position: relative;
  display: flex;
`;

const SlideContainer = styled.div<{ $width: number }>`
  width: ${({ $width }) => `${$width}vw`};
  min-width: 200px;
  margin: auto;
`;
