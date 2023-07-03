// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import Student from "../../../models/student.model";
import allocateSubjects, {
  IElectiveData,
  ISubjectData,
} from "../../../helpers/elective-alloter-refactored";
import XLSX from "xlsx";

type Data = Buffer;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const client = await MongoClient.connect(
      process.env.DB_CONNECTION as string
    );
    const sem = req.query.sem && +req.query.sem;
    const db = client.db("cse");
    const collection = db.collection("student-data");
    const unfilteredStudentData = (await collection
      .find()
      .toArray()) as Student[];
    const filteredData = unfilteredStudentData
      .filter(
        (student) =>
          student.CURRENT_SEM === sem &&
          student.CGPA &&
          student.ELECTIVE_SELECTIONS
      )
      .map((student) => ({
        REGNO: student.REGNO!,
        CGPA: student.CGPA!,
        ELECTIVE_SELECTIONS: student.ELECTIVE_SELECTIONS!,
      }))
      .sort((a, b) => b.CGPA - a.CGPA);
    const finalData = allocateSubjects(filteredData);
    let transformedFinalData: {
      REGNO: number;
      CGPA: number;
      [key: string]: number | string;
    }[] = [];
    await client.close();
    switch (sem) {
      case 5:
        transformedFinalData = finalData
          .filter((student) => student.ELECTIVE_3)
          .map((student) => ({
            REGNO: student.REGNO,
            CGPA: student.CGPA,
            ...(student.ELECTIVE_3 && {
              ELECTIVE_3: `${(student.ELECTIVE_3 as ISubjectData).CODE} ${(student.ELECTIVE_3 as ISubjectData).TITLE
                }`,
            }),
            ...(student.ELECTIVE_4 && {
              ELECTIVE_4: `${(student.ELECTIVE_4 as ISubjectData).CODE} ${(student.ELECTIVE_4 as ISubjectData).TITLE
                }`,
            }),
          }));
        break;
      case 7:
        transformedFinalData = finalData
          .filter((student) => student.ELECTIVE_7)
          .map((student) => ({
            REGNO: student.REGNO,
            CGPA: student.CGPA,
            ELECTIVE_7_CODE: `${(student.ELECTIVE_7 as ISubjectData).CODE} `,
            ELECTIVE_7_TITLE: `${(student.ELECTIVE_7 as ISubjectData).TITLE}`,
            ELECTIVE_8_CODE: `${(student.ELECTIVE_8 as ISubjectData).CODE} `,
            ELECTIVE_8_TITLE: `${(student.ELECTIVE_8 as ISubjectData).TITLE}`,
          }));

        break;
    }
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(transformedFinalData);
    const wrapTextStyle = { wrapText: true };
    const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1: A1");
    for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
      for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
        const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
        if (!worksheet[cellAddress]) continue;
        worksheet[cellAddress].s = wrapTextStyle;
      }
    }
    XLSX.utils.book_append_sheet(workbook, worksheet, "Consolidated");
    const buffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${sem}th_Data.xlsx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(Buffer.from(buffer));
  }
}
