// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

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
    
    const data = await collection.find().toArray();

    const _6thSemData = data.filter(student => student.CURRENT_SEM === 6);
    const _4thSemData = data.filter(student => student.CURRENT_SEM === 4);

    const selectionData_6thSem = _6thSemData.filter(student => student.ELECTIVE_SELECTIONS);
    const selectionData_4thSem = _4thSemData.filter(student => student.ELECTIVE_SELECTIONS);

    const emptySelection_6thSem = _6thSemData.filter(student => !student.ELECTIVE_SELECTIONS);
    const emptySelection_4thSem = _4thSemData.filter(student => !student.ELECTIVE_SELECTIONS);

    const finalData = {
        _4thSemSelectionCount: selectionData_4thSem.length,
        _6thSemSelectionCount: selectionData_6thSem.length,
        _4thSemEmptySelectionCount: emptySelection_4thSem.length,
        _6thSemEmptySelectionCount: emptySelection_6thSem.length,
        emptySelection_4thSem: emptySelection_4thSem.map(student => `${student.REGNO} ${student.NAME}`),
        emptySelection_6thSem: emptySelection_6thSem.map(student => `${student.REGNO} ${student.NAME}`)
    }

    res.status(200).json({ data: finalData, error: false, message: "Success" });
  } else {
    res
      .status(405)
      .json({ data: null, error: true, message: "Invalid request" });
  }
}
