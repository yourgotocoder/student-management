// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

type Data = {
  message: string;
  error: boolean;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    if (process.env.DB_CONNECTION) {
      const { id } = req.body;
      const client = await MongoClient.connect(process.env.DB_CONNECTION);
      const db = client.db("cse");
      const collection = db.collection("student-data");
      const student = await collection.findOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: "Success", error: false, data: student });
    } else {
      res
        .status(500)
        .json({ message: "Oops, something went wrong", error: true });
    }
  } else {
    res.status(400).json({ message: "Invalid request", error: true });
  }
}
