import bookintro from "../assets/bookIntro.jpg";
import bookJpg from "../assets/books.jpg";
import lizard_2560 from "../assets/book_section/background/lizard-background-2560.webp";
import lizard_1280 from "../assets/book_section/background/lizard-background-1280.webp";
import lizard_760 from "../assets/book_section/background/lizard-background-760.webp";
import lizard_thumnail_320 from "../assets/book_section/thumnail/lizard-thumnail-320.webp";
import lizard_thumnail_640 from "../assets/book_section/thumnail/lizard-thumnail-640.webp";
import deepJpg from "../assets/deep.jpg";
import structureJpg from "../assets/structure3.jpg";
import darkJpg from "../assets/dark.jpg";
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

const intro = new Book("intro", 12345678, "", BOOKINTRO, bookintro, "");

const interview = new Book(
  "interview",
  20250101,
  "면접을 위한 CS 전공지식 노트",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.Optio, Lorem ipsum dolor sit amet consectetur adipisicing elit.Optio ",
  //bookJpg
  `${lizard_2560} 2560w, ${lizard_1280} 1280w, ${lizard_760} 760w`,
  `${lizard_thumnail_320} 320w, ${lizard_thumnail_640} 640w`
);

const learningJs = new Book(
  "learningJs",
  20250102,
  "Learning Javascript Data Structures and Algorithms",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.Optio, Lorem ipsum dolor sit amet consectetur adipisicing elit.Optio ",
  darkJpg,
  ""
);

const deepJs = new Book(
  "deepJs",
  20250103,
  "Deep Javascript",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  deepJpg,
  ""
);

const gracefulTs = new Book(
  "gracefulTs",
  20250106,
  "우아한 타입스크립트 with 리액트",
  "vel tempora dolorum repellendus at, est illum rerum reprehenderit quasi voluptates temporibus eligendi eos corporis deserunt sint eius.",
  structureJpg,
  ""
);

export const books = [intro, interview, learningJs, deepJs, gracefulTs];

export const CARD_WRAPPER_WIDTH = 90;
export const CARD_WRAPPER_GAP = 0;
export const CARD_TOTAL_WIDTH = CARD_WRAPPER_WIDTH + CARD_WRAPPER_GAP;
export const BOOK_SECTION_HEIGHT = 100;
export const INITIAL_Y_OFFSET = -50;
