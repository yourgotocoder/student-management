// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import Student from "../../../models/student.model";
import allocateSubjects, {
  IElectiveData,
} from "../../../helpers/elective-alloter-refactored";
import distributionStats, {
  IElectiveOptionDistribution,
} from "../../../helpers/elective-option-distribution";

type Data = {
  size?: number;
  missing?: number;
  missingData?: { REGNO: number; NAME: string; EMAIL_ID?: string }[];
  data?: IElectiveData[];
  optionDistribution?: IElectiveOptionDistribution;
  error: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const client = await MongoClient.connect(
      process.env.DB_CONNECTION as string
    );
    const sem = req.query.sem && +req.query.sem;
    if (!sem) {
      res.status(500).json({ error: true, message: "Invalid request" });
      return;
    }
    const db = client.db("cse");
    const collection = db.collection("student-data");
    const unfilteredStudentData = (await collection
      .find()
      .toArray()) as Student[];
    let missing: number;
    let missingData: Student[] = [];
    +sem === 5
      ? (missingData = unfilteredStudentData.filter(
          (student) =>
            student.CURRENT_SEM === sem &&
            (!student.ELECTIVE_SELECTIONS ||
              (student.ELECTIVE_SELECTIONS &&
                !student.ELECTIVE_SELECTIONS.ELECTIVE_3))
        ))
      : (missingData = unfilteredStudentData.filter(
          (student) =>
            student.CURRENT_SEM === sem &&
            (!student.ELECTIVE_SELECTIONS ||
              (student.ELECTIVE_SELECTIONS &&
                !student.ELECTIVE_SELECTIONS.OPEN_ELECTIVE))
        ));
    missing = missingData.length;
    const filteredData = unfilteredStudentData
      .filter(
        (student) =>
          student.CURRENT_SEM === sem &&
          student.CGPA &&
          student.ELECTIVE_SELECTIONS
      )
      .map((student) => ({
        REGNO: student.REGNO!,
        NAME: student.NAME!,
        CGPA: student.CGPA!,
        ELECTIVE_SELECTIONS: student.ELECTIVE_SELECTIONS!,
      }))
      .sort((a, b) => b.CGPA - a.CGPA);
    const dataToAllocate =
      sem === 5
        ? filteredData.filter(
            (student) => student.ELECTIVE_SELECTIONS.ELECTIVE_3
          )
        : filteredData.filter(
            (student) => student.ELECTIVE_SELECTIONS.ELECTIVE_7
          );
    const finalData = allocateSubjects(dataToAllocate, +sem!);
    const optionDistribution = distributionStats(dataToAllocate, finalData);
    await client.close();
    res.status(200).json({
      size:
        sem === 5
          ? finalData.filter((student) => student.ELECTIVE_3).length
          : finalData.filter((student) => student.ELECTIVE_7).length,
      missing,
      missingData: missingData.map((student) => ({
        REGNO: student.REGNO!,
        NAME: student.NAME!,
        EMAIL_ID: student.EMAIL_ID,
      })),
      optionDistribution,
      data:
        sem === 5
          ? finalData.filter((student) => student.ELECTIVE_3)
          : finalData.filter((student) => student.ELECTIVE_7),
      error: false,
      message: "Success",
    });
  }
}
