// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import Student from "../../../models/student.model";
import rankElectives from "../../../helpers/rank-elective";

type Data = {
  data: any;
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
    const db = client.db("cse");
    const collection = db.collection("student-data");
    const unfilteredStudentData = (await collection
      .find()
      .toArray()) as Student[];
    const filteredData = unfilteredStudentData
      .filter((student) => student.CGPA && student.ELECTIVE_SELECTIONS)
      .map((student) => ({
        REGNO: student.REGNO!,
        NAME: student.NAME!,
        CGPA: student.CGPA!,
        ELECTIVE_SELECTIONS: student.ELECTIVE_SELECTIONS!,
      }))
      .sort((a, b) => b.CGPA - a.CGPA);
    //Rank the subjects per elective based on preference weightage
    const finalData = rankElectives(filteredData);
    await client.close();
    res.status(200).json({
      data: finalData,
      error: false,
      message: "Success",
    });
  }
}
