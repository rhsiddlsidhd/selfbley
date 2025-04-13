import bookintro from "../assets/bookIntro.jpg";
import bookJpg from "../assets/books.jpg";
import deepJpg from "../assets/deep.jpg";
import structureJpg from "../assets/structure3.jpg";
import darkJpg from "../assets/dark.jpg";
import { BOOKINTRO } from "./textConstants";

interface BookInterface {
  updatedAt: number;
  title: string;
  description: string;
  src: string;
  isIntro?: boolean;
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
   * @param isIntro 인트로 텍스트 여부 (기본값: false)
   */
  constructor(
    public updatedAt: number,
    public title: string,
    public description: string,
    public src: string,
    public isIntro: boolean = false
  ) {
    this.formattedDate = formatDate(updatedAt);
  }
}

const intro = new Book(12391311, "", BOOKINTRO, bookintro, true);

const interview = new Book(
  20250101,
  "면접을 위한 CS 전공지식 노트",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.Optio, Lorem ipsum dolor sit amet consectetur adipisicing elit.Optio ",
  bookJpg
);

const learningJs = new Book(
  20250102,
  "Learning Javascript Data Structures and Algorithms",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.Optio, Lorem ipsum dolor sit amet consectetur adipisicing elit.Optio ",
  darkJpg
);

const deepJs = new Book(
  20250103,
  "Deep Javascript",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  deepJpg
);

const gracefulTs = new Book(
  20250106,
  "우아한 타입스크립트 with 리액트",
  "vel tempora dolorum repellendus at, est illum rerum reprehenderit quasi voluptates temporibus eligendi eos corporis deserunt sint eius.",
  structureJpg
);

const books = [intro, interview, learningJs, deepJs, gracefulTs];

export default books;
