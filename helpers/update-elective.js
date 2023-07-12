const parser = require("simple-excel-to-json");
const _5thdoc = parser.parseXls2Json(__dirname + "/resources/5th_Data.xlsx")[0];
const _7thdoc = parser.parseXls2Json(__dirname + "/resources/7th_Data.xlsx")[0];
const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  for (let [index, student] of _7thdoc.entries()) {
    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_7: {
            CODE: student.ELECTIVE_7_CODE,
            TITLE: student.ELECTIVE_7_TITLE,
          },
          ELECTIVE_8: {
            CODE: student.ELECTIVE_8_CODE,
            TITLE: student.ELECTIVE_8_TITLE,
          },
        },
      }
    );
    console.log(`${index + 1} of ${_7thdoc.length} done`);
  }
};

updateElective();
