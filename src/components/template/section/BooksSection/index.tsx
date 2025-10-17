import { useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import useScreenStore, { Mode } from "../../../../stores/useScreenStore";

import Marquee from "../../../molecules/Marquee/index";

import useBookData from "../../../../hooks/useBookData";
import BookBackground from "../../../organism/background/BookBackground";
import BookCard from "../../../organism/card/BookCard";
import SVGContainer from "../../container/SVGContainer";
import Sign from "../../../atoms/Sign";

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

export const CARD_WRAPPER_WIDTH = 100;
const BOOK_SECTION_HEIGHT = 100;

const BooksSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: "some" });
  const mode = useScreenStore((state) => state.mode);
  const { bookData } = useBookData();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
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
      <BookBackground
        data={bookData}
        scrollYProgress={scrollYProgress}
        isInView={isInView}
      />

      <StickyArea $mode={mode}>
        <CardScroller style={{ x }} $totalBooks={bookData.length}>
          {bookData.map((book, idx) => {
            return (
              <SlideContainer key={idx} $width={CARD_WRAPPER_WIDTH}>
                <BookCard book={book} />
              </SlideContainer>
            );
          })}

          <SVGContainer
            isInView={isInView}
            $width={0.25}
            style={{ top: "15%", left: "2%" }}
          >
            <Sign type={0} />
          </SVGContainer>

          <SVGContainer
            isInView={isInView}
            $width={0.4}
            style={{ bottom: "5%", left: "19%" }}
          >
            <Sign type={3} />
          </SVGContainer>

          <SVGContainer
            isInView={isInView}
            $width={0.5}
            style={{ bottom: "15%", left: "40%" }}
          >
            <Sign type={2} />
          </SVGContainer>

          <SVGContainer
            isInView={isInView}
            $width={0.2}
            style={{ top: "0%", left: "62%" }}
          >
            <Sign type={0} />
          </SVGContainer>

          <SVGContainer
            isInView={isInView}
            $width={0.6}
            style={{ bottom: "0%", left: "80%" }}
          >
            <Sign type={3} />
          </SVGContainer>

          <SVGContainer
            isInView={isInView}
            $width={0.4}
            style={{ top: "5%", left: "95%" }}
          >
            <Sign type={1} />
          </SVGContainer>
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

const SlideContainer = styled.div<{ $width: number }>`
  width: ${({ $width }) => `${$width}vw`};
  min-width: 200px;
  margin: auto;
`;
