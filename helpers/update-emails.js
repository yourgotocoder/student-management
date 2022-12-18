const parser = require("simple-excel-to-json");
const doc = parser.parseXls2Json(__dirname + "/resources/_4thSemEmail.xlsx");
const fs = require("fs");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const email_list = [...doc][0];

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const missing_students = [];
  for (let [index, student] of email_list.entries()) {
    const studentData = await collection.findOne({ REGNO: student.REGNO });
    if (studentData) {
      // await collection.updateOne({REGNO: student.REGNO}, {
      //   $set: {
      //     EMAIL_ID: student.EMAIL_ID
      //   }
      // })
    } else {
      missing_students.push(student);
      // console.log(`${student.REGNO} does not exist in db`)
    }
    // console.log(`${index}/${email_list.length} done`)
  }
  console.log(missing_students.length);
  // fs.writeFileSync(
  //   __dirname + "/resources/MissingStudents.json",
  //   JSON.stringify(missing_students)
  // );
};

updateElective();
