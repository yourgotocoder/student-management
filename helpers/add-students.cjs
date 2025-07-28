const { MongoClient } = require("mongodb");
const generatePassword = require("generate-password");
const parser = require("simple-excel-to-json");
require("dotenv").config();

const studentData = parser.parseXls2Json(
  "./resources/student_list_3rd.xlsx",
)[0];
console.log(studentData);

const updateDB = async (students) => {
  console.log("Connecting to db");
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  if (client) {
    console.log("Connected to db");
  } else {
    console.log("Connection failed");
  }
  const db = client.db("cse");
  const collection = db.collection("student-data");

  for (let [index, student] of students.entries()) {
    let _student = {
      REGNO: student.REGNO,
      NAME: student.NAME,
      EMAIL_ID: student.EMAIL,
      CURRENT_SEM: 3,
      DEFAULT_PASSWORD: generatePassword.generate({ length: 10 }),
      BRANCH: student.BRANCH,
      ...(student.CGPA && { CGPA: student.CGPA }),
    };

    const foundStudent = await collection.findOne({ REGNO: student.REGNO });
    if (!foundStudent) {
      await collection.insertOne(_student);
      console.log(`Inserted ${_student.REGNO}`);
    } else {
      console.log("Already exists");
    }
    console.log(`${index + 1} of ${students.length} done`);
  }

  await client.close();
};

updateDB(studentData);
