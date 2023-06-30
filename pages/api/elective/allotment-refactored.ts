// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import Student from "../../../models/student.model";
import allocateSubjects, {
  IElectiveData,
} from "../../../helpers/elective-alloter-refactored";

type Data = {
  data: IElectiveData[];
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
    const db = client.db("cse");
    const collection = db.collection("student-data");
    const unfilteredData = (await collection.find().toArray()) as Student[];
    const filteredData = unfilteredData
      .filter((data) => data.CURRENT_SEM === sem && data.ELECTIVE_SELECTIONS)
      .map((data) => ({
        REGNO: data.REGNO!,
        CGPA: data.CGPA!,
        ELECTIVE_SELECTIONS: data.ELECTIVE_SELECTIONS!,
      }));
    const finalData = allocateSubjects(filteredData);
    await client.close();
    res.status(200).json({ data: finalData, error: false, message: "Success" });
  }
}
