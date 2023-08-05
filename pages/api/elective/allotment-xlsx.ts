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
        NAME: student.NAME!,
        ELECTIVE_SELECTIONS: student.ELECTIVE_SELECTIONS!,
      }))
      .sort((a, b) => b.CGPA - a.CGPA);
    const dataToBeAllocated =
      sem === 5
        ? filteredData.filter(
            (student) => student.ELECTIVE_SELECTIONS.ELECTIVE_3
          )
        : filteredData.filter(
            (student) => student.ELECTIVE_SELECTIONS.OPEN_ELECTIVE
          );
    const finalData = allocateSubjects(dataToBeAllocated, +sem!);
    let transformedFinalData: {
      REGNO: number;
      CGPA: number;
      NAME: string;
      [key: string]: number | string;
    }[] = [];
    let subjectData: {
      [key: string]: { REGNO: number; CGPA: number; NAME: string }[];
    } = {};
    await client.close();
    switch (sem) {
      case 5:
        transformedFinalData = finalData
          .filter((student) => student.ELECTIVE_3)
          .map((student) => ({
            REGNO: student.REGNO,
            NAME: student.NAME,
            CGPA: student.CGPA,
            ELECTIVE_3_CODE: `${(student.ELECTIVE_3 as ISubjectData).CODE} `,
            ELECTIVE_3_TITLE: `${(student.ELECTIVE_3 as ISubjectData).TITLE}`,
            ELECTIVE_4_CODE: `${(student.ELECTIVE_4 as ISubjectData).CODE} `,
            ELECTIVE_4_TITLE: `${(student.ELECTIVE_4 as ISubjectData).TITLE}`,
          }));
        const safeData = finalData.filter((student) => student.ELECTIVE_3);
        for (let student of safeData) {
          const elective_3_title = `${
            (student.ELECTIVE_3 as ISubjectData).TITLE
          }`;
          const elective_4_title = `${
            (student.ELECTIVE_4 as ISubjectData).TITLE
          }`;
          const studentObj = {
            REGNO: student.REGNO,
            NAME: student.NAME,
            CGPA: student.CGPA,
          };
          if (!subjectData[elective_3_title]) {
            subjectData[elective_3_title] = [];
            subjectData[elective_3_title].push(studentObj);
          } else {
            subjectData[elective_3_title].push(studentObj);
          }
          if (!subjectData[elective_4_title]) {
            subjectData[elective_4_title] = [];
            subjectData[elective_4_title].push(studentObj);
          } else {
            subjectData[elective_4_title].push(studentObj);
          }
        }
        break;
      case 7:
        transformedFinalData = finalData
          .filter((student) => student.ELECTIVE_7)
          .map((student) => ({
            REGNO: student.REGNO,
            NAME: student.NAME,
            CGPA: student.CGPA,
            OPEN_ELECTIVE_CODE: `${
              (student.OPEN_ELECTIVE as ISubjectData).CODE
            } `,
            OPEN_ELECTIVE_TITLE: `${
              (student.OPEN_ELECTIVE as ISubjectData).TITLE
            }`,
          }));
        const safeData7 = finalData.filter((student) => student.OPEN_ELECTIVE);
        for (let student of safeData7) {
          // const elective_7_title = `${
          //   (student.ELECTIVE_7 as ISubjectData).TITLE
          // }`;
          // const elective_8_title = `${
          //   (student.ELECTIVE_8 as ISubjectData).TITLE
          // }`;
          const open_elective_title = `${
            (student.OPEN_ELECTIVE as ISubjectData).TITLE
          }`;
          const studentObject = {
            REGNO: student.REGNO,
            NAME: student.NAME,
            CGPA: student.CGPA,
          };
          // if (!subjectData[elective_7_title]) {
          //   subjectData[elective_7_title] = [];
          //   subjectData[elective_7_title].push(studentObject);
          // } else {
          //   subjectData[elective_7_title].push(studentObject);
          // }
          // if (!subjectData[elective_8_title]) {
          //   subjectData[elective_8_title] = [];
          //   subjectData[elective_8_title].push(studentObject);
          // } else {
          //   subjectData[elective_8_title].push(studentObject);
          // }
          if (!subjectData[open_elective_title]) {
            subjectData[open_elective_title] = [];
            subjectData[open_elective_title].push(studentObject);
          } else {
            subjectData[open_elective_title].push(studentObject);
          }
        }
        break;
    }
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(transformedFinalData);
    const maxNameWidth = transformedFinalData.reduce((prevMax, curr) => {
      return Math.max(prevMax, curr.NAME.length);
    }, 0);
    const maxRegnoWidth = transformedFinalData.reduce((prevMax, cur) => {
      return Math.max(prevMax, `${cur.REGNO}`.length);
    }, 0);
    worksheet["!cols"] = [
      { width: maxRegnoWidth + 2 },
      { width: maxNameWidth + 2 },
      { width: 15 },
      { width: 20 },
      { width: 30 },
    ];
    XLSX.utils.book_append_sheet(workbook, worksheet, "Consolidated");
    for (let key in subjectData) {
      let sheet = XLSX.utils.json_to_sheet(subjectData[key]);
      sheet["!cols"] = [{ wch: maxRegnoWidth }, { wch: maxNameWidth }];
      XLSX.utils.book_append_sheet(workbook, sheet, key.substring(0, 31));
    }
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
