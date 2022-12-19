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
    

    res.status(200).json({ data: undefined, error: false, message: "Success" });
  } else {
    res
      .status(405)
      .json({ data: null, error: true, message: "Invalid method" });
  }
}
