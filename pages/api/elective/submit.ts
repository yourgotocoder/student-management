// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

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
      const { elective_selections, _id } = req.body;
      const client = await MongoClient.connect(process.env.DB_CONNECTION);
      const db = client.db("cse");
      const collection = db.collection("student-data");
      const student = await collection.findOne({ _id: new ObjectId(_id) });
      if (student) {
        if (
          (student.CURRENT_SEM === 6 &&
            student.ELECTIVE_SELECTIONS &&
            student.ELECTIVE_SELECTIONS.ELECTIVE_5) ||
          (student.CURRENT_SEM === 4 && student.ELECTIVE_SELECTIONS)
        ) {
          await client.close();
          res
            .status(200)
            .json({ message: "Selections already submitted", error: true });
        } else {
          await collection.updateOne(
            { _id: new ObjectId(_id) },
            {
              $set: {
                ELECTIVE_SELECTIONS: {
                  ...student.ELECTIVE_SELECTIONS,
                  ...elective_selections,
                },
              },
            }
          );
          await client.close();
          res.status(200).json({ message: "Success", error: false });
        }
      } else {
        await client.close();
        res
          .status(504)
          .json({ message: "Registration number not found", error: true });
      }
    }
  } else {
    res.status(400).json({ message: "Invalid request", error: true });
  }
}
