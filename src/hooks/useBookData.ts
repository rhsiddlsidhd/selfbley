import { useEffect, useState } from "react";
import { BookData } from "../components/template/section/BooksSection";
import { fetchApiHandler } from "../api/bookApi";

const BOOKSTITLE = [
  "우아한 타입스크립트 with 리액트",
  "리액트 훅을 활용한 마이크로 상태 관리",
  "쏙쏙 들어오는 함수형 코딩",
  "모던 자바스크립트 Deep Dive",
  "프론트엔드 성능 최적화 가이드",
];

const useBookData = () => {
  const [bookData, setBookData] = useState<BookData[]>([]);

  useEffect(() => {
    const fetchPromiseAll = async () => {
      const promises = BOOKSTITLE.map((book) => fetchApiHandler(book));
      const responses = await Promise.all(promises);
      const data = responses
        .filter((res) => res.success)
        .map((res) => res.data.items[0]);
      setBookData(data);
    };

    fetchPromiseAll();
  }, []);

  return { bookData };
};

export default useBookData;
