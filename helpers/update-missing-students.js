const parser = require("simple-excel-to-json");
const data = parser
  .parseXls2Json("./resources/_6thSem.xlsx")[0]
  .filter((student) => student.EMAIL_ID);
const { MongoClient } = require("mongodb");
const generatePassword = require("generate-password");
require("dotenv").config();

console.log(data, data.length);

const updateDB = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");

  const transformData = data.map((student) => ({
    REGNO: student.REGNO,
    NAME: student.NAME,
    EMAIL_ID: student.EMAIL_ID || "",
    CURRENT_SEM: 6,
    DEFAULT_PASSWORD: generatePassword.generate({ length: 10 }),
    BRANCH: "CSE",
  }));

  for (let students of transformData) {
    const foundStudent = await collection.findOne({ REGNO: students.REGNO });
    if (!foundStudent) {
      await collection.insertOne(students);
      console.log(`Inserted ${students.REGNO}`);
    }
  }
};
updateDB();
