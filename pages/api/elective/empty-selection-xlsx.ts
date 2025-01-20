// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import XLSX from "xlsx";

type Data =
  | {
    size?: number;
    data: { REGNO: number; NAME: string }[] | null;
    error: boolean;
    message: string;
  }
  | Buffer;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "GET") {
    const client = await MongoClient.connect(
      process.env.DB_CONNECTION as string,
    );
    const db = client.db("cse");
    const collection = db.collection("student-data");
    const sem = req.query.sem && +req.query.sem;
    const branch = req.query.branch;
    const data = await collection.find().toArray();
    await client.close();

    const _semData = data.filter(
      (student) => student.CURRENT_SEM === sem && student.BRANCH === branch,
    );
    let finalData: { REGNO: number; NAME: string; CGPA?: number }[] = [];
    switch (sem) {
      case 4:
        finalData = _semData
          .filter(
            (student) =>
              student.ELECTIVE_SELECTIONS &&
              !student.ELECTIVE_SELECTIONS.ELECTIVE_2,
          )
          .map((student) => ({ REGNO: student.REGNO, NAME: student.NAME }));
        break;

      case 5:
        finalData = _semData
          .filter(
            (student) =>
              student.ELECTIVE_SELECTIONS &&
              !student.ELECTIVE_SELECTIONS.ELECTIVE_3,
          )
          .map((student) => ({ REGNO: student.REGNO, NAME: student.NAME }));
        break;

      case 6:
        finalData = _semData
          .filter(
            (student) =>
              student.ELECTIVE_SELECTIONS &&
              !student.ELECTIVE_SELECTIONS.OPEN_ELECTIVE_3,
          )
          .map((student) => ({ REGNO: student.REGNO, NAME: student.NAME }));
        break;

      case 7:
        finalData = _semData
          .filter(
            (student) =>
              student.ELECTIVE_SELECTIONS &&
              !student.ELECTIVE_SELECTIONS.ELECTIVE_7,
          )
          .map((student) => ({ REGNO: student.REGNO, NAME: student.NAME }));
        break;
    }
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(finalData);
    XLSX.utils.book_append_sheet(workbook, worksheet, `${sem}th_MissingData`);
    const buffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${sem}th_MissingData.xlsx`,
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.send(Buffer.from(buffer));
  } else {
    res
      .status(405)
      .json({ data: null, error: true, message: "Invalid request" });
  }
}
