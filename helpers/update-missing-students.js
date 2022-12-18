const data = require("./resources/MissingStudents.json");
const { MongoClient } = require("mongodb");
const generatePassword = require("generate-password");
require("dotenv").config();

const updateDB = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const transformData = data.map((student) => ({
    REGNO: student.REGNO,
    NAME: student.NAME,
    CURRENT_SEM: 4,
    EMAIL_ID: student.EMAIL_ID,
    ELECTIVE_1_OPTIONS: [
      {
        CODE: "CS1438/CS1431",
        TITLE: "Microprocessors and Peripheral Devices",
      },
      {
        CODE: "CS1440/CS1425",
        TITLE: "Internet, Technology and Society",
      },
    ],
    ELECTIVE_2_OPTIONS: [
      {
        CODE: "CS1442",
        TITLE: "User Interface/User Experience (UI/UX) Design",
      },
      {
        CODE: "CS1434",
        TITLE: "Java Programming",
      },
      {
        CODE: "CS1435",
        TITLE: "Python Programming",
      },
      {
        CODE: "CS1435",
        TITLE: "Fundamentals of Web Technology",
      },
    ],
    DEFAULT_PASSWORD: generatePassword.generate({ length: 10 }),
  }));
  for (let students of transformData) {
    const foundStudent = await collection.findOne({ REGNO: students.REGNO });
    if (!foundStudent) {
      await collection.insertOne(students)
      console.log(`Inserted ${students.REGNO}`)
    }
  }
};

updateDB()