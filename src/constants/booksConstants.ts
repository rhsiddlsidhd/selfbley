import lizard_2560 from "../assets/book_section/background/lizard-background-2560.webp";
import lizard_1920 from "../assets/book_section/background/lizard-background-1920.webp";
import lizard_1280 from "../assets/book_section/background/lizard-background-1280.webp";
import lizard_760 from "../assets/book_section/background/lizard-background-760.webp";
import lizard_320 from "../assets/book_section/thumnail/lizard-thumnail-320.webp";
import lizard_640 from "../assets/book_section/thumnail/lizard-thumnail-640.webp";
import lizard_480 from "../assets/book_section/thumnail/lizard-thumnail-480.webp";

import algorithms_2560 from "../assets/book_section/background/algorithms-background-2560.webp";
import algorithms_1920 from "../assets/book_section/background/algorithms-background-1920.webp";
import algorithms_1280 from "../assets/book_section/background/algorithms-background-1280.webp";
import algorithms_760 from "../assets/book_section/background/algorithms-background-760.webp";
import algorithms_640 from "../assets/book_section/thumnail/algorithms-thumnail-640.webp";
import algorithms_320 from "../assets/book_section/thumnail/algorithms-thumnail-320.webp";
import algorithms_480 from "../assets/book_section/thumnail/algorithms-thumnail-480.webp";

import note_2560 from "../assets/book_section/background/note-background-2560.webp";
import note_1920 from "../assets/book_section/background/note-background-1920.webp";
import note_1280 from "../assets/book_section/background/note-background-1280.webp";
import note_760 from "../assets/book_section/background/note-background-760.webp";
import note_640 from "../assets/book_section/thumnail/note-thumnail-640.webp";
import note_320 from "../assets/book_section/thumnail/note-thumnail-320.webp";
import note_480 from "../assets/book_section/thumnail/note-thumnail-480.webp";

import woowa_2560 from "../assets/book_section/background/woowabrothers-background-2560.webp";
import woowa_1920 from "../assets/book_section/background/woowabrothers-background-1920.webp";
import woowa_1280 from "../assets/book_section/background/woowabrothers-background-1280.webp";
import woowa_760 from "../assets/book_section/background/woowabrothers-background-760.webp";
import woowa_640 from "../assets/book_section/thumnail/woowabrothers-thumnail-640.webp";
import woowa_320 from "../assets/book_section/thumnail/woowabrothers-thumnail-320.webp";
import woowa_480 from "../assets/book_section/thumnail/woowabrothers-thumnail-480.webp";

import book_intro_2560 from "../assets/book_section/background/book-section-intro-2560.webp";
import book_intro_1920 from "../assets/book_section/background/book-section-intro-1920.webp";
import book_intro_1280 from "../assets/book_section/background/book-section-intro-1280.webp";
import book_intro_760 from "../assets/book_section/background/book-section-intro-760.webp";
import book_intro_640 from "../assets/book_section/thumnail/book-section-intro-640.webp";
import book_intro_320 from "../assets/book_section/thumnail/book-section-intro-320.webp";
import book_intro_480 from "../assets/book_section/thumnail/book-section-intro-480.webp";

import { BOOKINTRO } from "./textConstants";

interface BookInterface {
  id: string;
  updatedAt: number;
  title: string;
  description: string;
  src: string;
}

const formatDate = (date: number) => {
  const str = date.toString();
  return `${str.slice(2, 4)}/${str.slice(4, 6)}/${str.slice(6)}`;
};

export class Book implements BookInterface {
  public formattedDate: string;
  /**
   *
   * @param updatedAt 책을 최근에 읽은 날짜 (YYYYMMDD 형식의 숫자)
   * @param title 책 제목
   * @param description 책 설명
   * @param src 책 이미지 경로
   */
  constructor(
    public id: string,
    public updatedAt: number,
    public title: string,
    public description: string,
    public src: string,
    public thumnail: string
  ) {
    this.formattedDate = formatDate(updatedAt);
  }
}

const intro = new Book(
  "intro",
  12345678,
  "",
  BOOKINTRO,
  `${book_intro_2560} 2560w, ${book_intro_1920} 1920w, ${book_intro_1280} 1280w, ${book_intro_760} 760w`,
  `${book_intro_320} 320w, ${book_intro_640} 640w, ${book_intro_480} 480w`
);

const interview = new Book(
  "interview",
  20250101,
  "면접을 위한 CS 전공지식 노트",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.Optio, Lorem ipsum dolor sit amet consectetur adipisicing elit.Optio ",
  `${note_2560} 2560w, ${note_1920} 1920w, ${note_1280} 1280w, ${note_760} 760w`,
  `${note_320} 320w, ${note_640} 640w, ${note_480} 480w`
);

const learningJs = new Book(
  "learningJs",
  20250102,
  "Learning Javascript Data Structures and Algorithms",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.Optio, Lorem ipsum dolor sit amet consectetur adipisicing elit.Optio ",
  `${algorithms_2560} 2560w, ${algorithms_1920} 1920w, ${algorithms_1280} 1280w, ${algorithms_760} 760w`,
  `${algorithms_640} 640w,  ${algorithms_320} 320w, ${algorithms_480} 480w`
);

const deepJs = new Book(
  "deepJs",
  20250103,
  "Deep Javascript",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  `${lizard_2560} 2560w, ${lizard_1920} 1920w, ${lizard_1280} 1280w, ${lizard_760} 760w`,
  `${lizard_320} 320w, ${lizard_640} 640w, ${lizard_480} 480w`
);

const gracefulTs = new Book(
  "gracefulTs",
  20250106,
  "우아한 타입스크립트 with 리액트",
  "vel tempora dolorum repellendus at, est illum rerum reprehenderit quasi voluptates temporibus eligendi eos corporis deserunt sint eius.",
  `${woowa_2560} 2560w, ${woowa_1920} 1920w, ${woowa_1280} 1280w, ${woowa_760} 760w`,
  `${woowa_320} 320w, ${woowa_640} 640w, ${woowa_480} 480w`
);

export const books = [intro, interview, learningJs, deepJs, gracefulTs];

export const CARD_WRAPPER_WIDTH = 90;
export const CARD_WRAPPER_GAP = 0;
export const CARD_TOTAL_WIDTH = CARD_WRAPPER_WIDTH + CARD_WRAPPER_GAP;
export const BOOK_SECTION_HEIGHT = 100;
export const INITIAL_Y_OFFSET = -50;
