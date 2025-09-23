import path from "path";
import fs from "fs";

function handler(req, res) {
  const filePath = path.join(process.cwd(), "db.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const booksData = JSON.parse(jsonData);

  const { q } = req.query;

  const book = booksData.books.find((b) => b.id === q);

  if (!book)
    return res
      .status(404)
      .json({ success: false, data: { error: "Not Found" } });

  return res.status(200).json({ success: true, data: book });
}

export default handler;
