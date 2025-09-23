import path from "path";
import fs from "fs";

function handler(req, res) {
  const filePath = path.join(process.cwd(), "db.json");
  console.log("filePath", filePath);
  const jsonData = fs.readFileSync(filePath, "utf-8");
  console.log("jsonData", jsonData);
  const booksData = JSON.parse(jsonData);
  console.log("booksData", booksData);

  const { q } = req.query;

  const book = booksData.books.find((b) => b.id === q);
  console.log("book", book);

  if (!book)
    return res
      .status(404)
      .json({ success: false, data: { error: "Not Found" } });

  return res.status(200).json({ success: true, data: book });
}

export default handler;
