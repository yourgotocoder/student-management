// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

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
    const { regno, password } = req.body;
    if (!regno) {
      res.status(403).json({ message: "Username required", error: true });
    } else if (!password) {
      res.status(403).json({ message: "Password required", error: true });
    } else {
      if (process.env.DB_CONNECTION) {
        const client = await MongoClient.connect(process.env.DB_CONNECTION);
        const db = client.db("cse");
        const collection = db.collection("student-data");
        const student = await collection.findOne({ REGNO: +regno });
        if (student) {
          if (student.DEFAULT_PASSWORD_CHANGED) {
            //Do something later
          } else {
            if (student.DEFAULT_PASSWORD === password) {
              res
              .status(200)
              .json({ message: "Success", error: false, data: student });
              await client.close();
            } else {
               client.close();
              res
                .status(400)
                .json({ message: "Invalid password", error: true });
            }
          }
        } else {
           client.close();
          res.status(404).json({ message: "Regno not found", error: true });
        }
      } else {
        res
          .status(500)
          .json({ message: "Oops! Something went wrong", error: true });
      }
    }
  } else {
    res.status(400).json({ message: "Invalid request", error: true });
  }
}
