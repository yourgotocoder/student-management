const { MongoClient } = require("mongodb");
const generatePassword = require("generate-password");
require("dotenv").config();

const updateDB = async () => {
  console.log("Connecting to db");
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  if (client) {
    console.log("Connected to db");
  } else {
    console.log("Connection failed");
  }
  const db = client.db("cse");
  const collection = db.collection("student-data");

  let student = {
    REGNO: 202200538,
    NAME: "YETING HERUKA LEPCHA",
    EMAIL_ID: "yeting_202200538@smit.smu.edu.in",
    CURRENT_SEM: 4,
    DEFAULT_PASSWORD: generatePassword.generate({ length: 10 }),
    BRANCH: "CSE",
  };

  const foundStudent = await collection.findOne({ REGNO: student.REGNO });
  if (!foundStudent) {
    await collection.insertOne(student);
    console.log(`Inserted ${student.REGNO}`);
  } else {
    console.log("Already exists");
  }
  await client.close();
};
updateDB();
