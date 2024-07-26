const parser = require("simple-excel-to-json");
const fs = require("fs");
const { MongoClient } = require("mongodb");
const json2xls = require("json2xls");
require("dotenv").config();

const updateElective = async (data, sem) => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const student_data = await collection.find().toArray();
  const filtered_data = student_data.filter(
    (student) => student.CURRENT_SEM === sem,
  );
  for (let stdData of filtered_data) {
    consoel.log(stdData.REGNO);
    const { NAME, CGPA } = data.find((st) => st.REGNO === stdData.REGNO);
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

const studentsData = parser.parseXls2Json("./resources/CGPA_3rd_sem.xlsx")[0];

updateElective(studentsData, 3);
