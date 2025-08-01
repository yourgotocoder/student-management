const parser = require("simple-excel-to-json");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = parser.parseXls2Json("./resources/history.xlsx")[0];

  for (let student of data) {
    const foundStudent = await collection.findOne({ REGNO: student.REGNO });
    const ELECTIVE_1 = {
      CODE: student.ELECTIVE_1_CODE,
      TITLE: student.ELECTIVE_1_TITLE,
    };
    if (foundStudent) {
      await collection.updateOne(
        { REGNO: student.REGNO },
        {
          $set: {
            ELECTIVE_1,
          },
        },
      );
    }
  }

  await client.close();
};

updateElective();
