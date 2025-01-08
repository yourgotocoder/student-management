const parser = require("simple-excel-to-json");
const fs = require("fs");
const { MongoClient } = require("mongodb");
const json2xls = require("json2xls");
require("dotenv").config();

const updateElective = async (data) => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const student_data = await collection.find().toArray();
  console.log(student_data);

  for (let stdData of student_data) {
    console.log(stdData.REGNO);
    const result = data.find((st) => st.REGNO === stdData.REGNO);
    let CGPA;
    if (result) {
      CGPA = result.CGPA;
    }
    if (CGPA) {
      await collection.updateOne(
        { REGNO: stdData.REGNO },
        {
          $set: {
            CGPA,
          },
        },
      );
    }
  }
  console.log("Updated cgpa");
  await client.close();
};

const studentsData = parser.parseXls2Json("./resources/cse.xlsx")[0];

updateElective(studentsData);
