// 이 파일은 Vercel 서버리스 함수로 동작합니다.
// Express와 같은 프레임워크가 필요 없으며, 요청(req)과 응답(res)을 직접 처리합니다.

// Naver API 클라이언트 ID 및 시크릿 환경 변수
// Vercel 프로젝트 설정에서 NAVER_CLIENT_ID와 NAVER_CLIENT_SECRET를 설정해야 합니다.
const CLIENT_ID = process.env.NAVER_CLIENT_ID;
const CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

// Naver Open API에서 책 정보를 검색하는 비동기 함수
const FetchNaverApiBook = async (q) => {
  const res = await fetch(
    `https://openapi.naver.com/v1/search/book.json?query=${q}`,
    {
      method: "GET",
      headers: {
        "X-Naver-Client-Id": CLIENT_ID,
        "X-Naver-Client-Secret": CLIENT_SECRET,
      },
    }
  );

  const data = await res.json();

  if ("errorMessage" in data) {
    throw { status: res.status, message: data.errorMessage };
  }

  return data;
};

// Vercel 서버리스 함수로 내보낼 핸들러 함수입니다.
// 이 함수가 클라이언트의 API 요청을 처리합니다.
module.exports = async (req, res) => {
  try {
    const query = req.query.q;

    // 검색어가 없는 경우 400 Bad Request 응답
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "검색어를 입력해주세요.",
        data: null,
      });
    }

    const data = await FetchNaverApiBook(query);

    // 성공적인 응답을 JSON 형태로 반환
    return res.status(200).json({ success: true, message: "검색 성공", data });
  } catch (e) {
    // API 호출 중 에러가 발생하면 에러 응답 반환
    const { status = 500, message = "내부 서버 오류" } = e;
    return res.status(status).json({ success: false, message, data: null });
  }
};
