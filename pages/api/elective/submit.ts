// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

type Data = {
  message: string;
  error?: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    if (process.env.DB_CONNECTION) {
      const { elective_selections, regno } = req.body;
      const client = await MongoClient.connect(process.env.DB_CONNECTION);
      const db = client.db("cse");
      const collection = db.collection("student-data");
      const student = await collection.findOne({ REGNO: regno });
      if (student) {
        if (student.ELECTIVE_SELECTIONS) {
          res
            .status(200)
            .json({ message: "Selections already submitted", error: true });
        } else {
          await collection.updateOne(
            { REGNO: regno },
            {
              $set: {
                ELECTIVE_SELECTIONS: elective_selections,
              },
            }
          );
          res.status(200).json({ message: "Success", error: false });
        }
      } else {
        res
          .status(504)
          .json({ message: "Registration number not found", error: true });
      }
      console.log(student);
    }
  } else {
    res.status(400).json({ message: "Invalid request", error: true });
  }
}
