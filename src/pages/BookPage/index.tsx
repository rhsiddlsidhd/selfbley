import { motion } from "motion/react";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { useNavigate, useSearchParams } from "react-router";
import useBookStore from "../../stores/bookStore";
import { BookReview } from "./type";
import { bookReviews } from "./constant";
import Link from "../../components/atoms/Link";
import SocialSVGIcon from "../../components/molecules/SocialIcon";
import LoadingContainer from "../../components/organism/LoadingContainer";

const BookPage = () => {
  const [viewData, setViewData] = useState<BookReview | null>(null);
  const [loading, setLoading] = useState(true);
  const getData = useBookStore((state) => state.book);
  const navigate = useNavigate();
  const query = useSearchParams()[0].get("q");

  useEffect(() => {
    if (!getData || !query) {
      navigate("/");
    } else {
      const data = bookReviews.filter((item) => item.id === getData.isbn);

      setViewData(data[0] ?? null);
      setLoading(false);
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }
  }, [getData, query, navigate]);

  if (loading) return <LoadingContainer />;

  return (
    <Container>
      <ContentWrapper>
        <MainBookSection>
          <ImgWrapper
            initial={{ scale: 0.8, rotateY: -15 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BookCover src={getData?.image} alt="Selected Book" />
            <BookShadow />
          </ImgWrapper>

          <BookInfo
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <BookTitle>{getData?.title}</BookTitle>
            <BookSubtitle>선택한 도서</BookSubtitle>
          </BookInfo>
        </MainBookSection>
        {!viewData && (
          <RelatedBooksSection
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            데이터가 없습니다.
          </RelatedBooksSection>
        )}
        {viewData && (
          <RelatedBooksSection
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <SectionTitle>
              <h2>후기</h2>
              <Link
                href={viewData.tistory}
                $isDisabled={viewData.tistory === "#"}
              >
                <SocialSVGIcon type="tistory" $size="md" />
              </Link>
            </SectionTitle>
            <BooksGrid>
              <BookCard
                key={viewData.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  scale: 1.02,
                }}
              >
                <CardImageWrapper>
                  {getData && (
                    <CardImage src={getData.image} alt={viewData.title} />
                  )}
                </CardImageWrapper>
                <CardContent>
                  <CardTitle>{viewData.title}</CardTitle>
                  <CardAuthor>{viewData.author}</CardAuthor>
                  <CardDescription>
                    {viewData.description === "#"
                      ? "준비중입니다."
                      : viewData.description}
                  </CardDescription>
                </CardContent>
              </BookCard>
            </BooksGrid>
          </RelatedBooksSection>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default BookPage;

const Container = styled(motion.div)`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
  overflow-x: hidden;
  position: relative;
  z-index: 5;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const MainBookSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  margin-bottom: 4rem;
  min-height: 60vh;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 3rem;
    min-height: 50vh;
  }
`;

const ImgWrapper = styled(motion.div)`
  position: relative;
  min-width: 300px;

  height: 400px;
  perspective: 1000px;
`;

const BookCover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: rotateY(5deg) scale(1.05);
  }
`;

const BookShadow = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
  border-radius: 12px;
  z-index: -1;
  filter: blur(20px);
`;

const BookInfo = styled(motion.div)`
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const BookTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const BookSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
`;

const RelatedBooksSection = styled(motion.div)`
  margin-top: 2rem;
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 2.5rem;
  & > h2 {
    color: white;
    font-size: 1.8rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BookCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const CardImageWrapper = styled.div`
  height: 180px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
`;

const CardImage = styled.img`
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  transition: transform 0.3s ease;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  ${BookCard}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const CardAuthor = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: #4b5563;
  line-height: 2;
`;
