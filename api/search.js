const CLIENT_ID = process.env.NAVER_CLIENT_ID;
const CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

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

const handler = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "검색어를 입력해주세요.",
        data: null,
      });
    }

    const data = await FetchNaverApiBook(query);

    return res.status(200).json({ success: true, message: "검색 성공", data });
  } catch (e) {
    const { status = 500, message = "내부 서버 오류" } = e;
    return res.status(status).json({ success: false, message, data: null });
  }
};

export default handler;
