// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import seatDistributor from "../../../helpers/seat-distributor";
import Student from "../../../models/student.model";
import allotment from "../../../helpers/elective-alloter";
import fs from "fs";

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

    const data = (await collection.find().toArray()) as Student[];
    const finalData = seatDistributor(data);
    await client.close();
    const allotedData = allotment(finalData, data);
    fs.writeFileSync("helpers/Allotment.json", JSON.stringify(allotedData));
    res.status(200).json({ data: allotedData, error: false, message: "Success" });
  } else {
    res
      .status(405)
      .json({ data: null, error: true, message: "Invalid method" });
  }
}
