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

  for (let stdData of student_data) {
    const result = data.find((st) => st.REGNO === stdData.REGNO);
    let CGPA;
    if (result) {
      CGPA = result.CGPA;
    }
    if (CGPA) {
      console.log(`Updating CGPA for ${stdData.REGNO} (${stdData.NAME})`);
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

const studentsData = parser.parseXls2Json(__dirname + "/CGPA_2026_Jan.xlsx")[0];

updateElective(studentsData);
