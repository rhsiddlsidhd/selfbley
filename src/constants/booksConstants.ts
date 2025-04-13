import bookJpg from "../assets/books.jpg";
import deepJpg from "../assets/deep.jpg";
import structureJpg from "../assets/structure3.jpg";
import darkJpg from "../assets/dark.jpg";

interface BookInterface {
  updatedAt: string;
  title: string;
  description: string;
  src: string;
}

class Book implements BookInterface {
  constructor(
    public updatedAt: string,
    public title: string,
    public description: string,
    public src: string
  ) {}
}

const csInterview = new Book(
  "250101",
  "면접을 위한 CS 전공지식 노트",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.Optio, Lorem ipsum dolor sit amet consectetur adipisicing elit.Optio ",
  bookJpg
);

const learningJs = new Book(
  "250101",
  "Learning Javascript Data Structures and Algorithms",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.Optio, Lorem ipsum dolor sit amet consectetur adipisicing elit.Optio ",
  darkJpg
);

const deepJavascript = new Book(
  "250101",
  "Deep Javascript",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  deepJpg
);

const gracefulTs = new Book(
  "250000",
  "우아한 타입스크립트 with 리액트",
  "vel tempora dolorum repellendus at, est illum rerum reprehenderit quasi voluptates temporibus eligendi eos corporis deserunt sint eius.",
  structureJpg
);

const books = [csInterview, learningJs, deepJavascript, gracefulTs];

export default books;
