const parser = require("simple-excel-to-json");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async (data) => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  for (let [index, student] of data.entries()) {
    const foundStudent = await collection.findOne({ REGNO: student["REGNO"] });
    if (foundStudent) {
      await collection.updateOne(
        { REGNO: student["REGNO"] },
        {
          $set: {
            MINOR_SPECIALIZATION: student.MINOR,
          },
        },
      );
    }
    console.log(
      `Student: ${student.NAME}(${student["REGNO"]}) Updated ${index + 1} of ${data.length}`,
    );
  }
};

const studentsData = parser.parseXls2Json("./resources/_7thMinor.xlsx")[0];

updateElective(studentsData);
