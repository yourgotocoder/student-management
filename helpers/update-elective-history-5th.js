const parser = require("simple-excel-to-json");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = parser.parseXls2Json("./resources/_4thData.xlsx")[0];

  const ELECTIVE_1_OPTIONS = [
    { CODE: "CS202A3", TITLE: "Java" },
    { CODE: "CS206A3", TITLE: "ITCT" },
    { CODE: "CS207A3", TITLE: "CG" },
    { CODE: "CS210A3", TITLE: "Microprocessor" },
  ];

  for (let student of data) {
    const foundStudent = await collection.findOne({ REGNO: student.REGNO });
    const ELECTIVE_1 = ELECTIVE_1_OPTIONS.find(
      (sub) => sub.TITLE === student.ELECTIVE_1,
    );
    if (foundStudent) {
      await collection.updateOne(
        { REGNO: student.REGNO },
        { $set: { ELECTIVE_1 } },
      );
    }
  }

  await client.close();
};

updateElective();
