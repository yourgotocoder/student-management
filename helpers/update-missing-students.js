const parser = require("simple-excel-to-json");
const data = parser
  .parseXls2Json("./resources/_4thSem.xlsx")[0]
  .filter((student) => student.EMAIL);
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
    // CGPA: student.CGPA,
    CURRENT_SEM: 4,
    EMAIL_ID: student.EMAIL,
    DEFAULT_PASSWORD: generatePassword.generate({ length: 10 }),
    BRANCH: "CSE",
  }));

  for (let students of transformData) {
    const foundStudent = await collection.findOne({ REGNO: students.REGNO });
    if (foundStudent) {
      await collection.updateOne(
        { REGNO: students.REGNO },
        {
          $set: {
            ELECTIVE_1_OPTIONS: [
              {
                CODE: "CS202A3",
                TITLE: "Java",
              },
              {
                CODE: "CS206A3",
                TITLE: "ITCT",
              },
              {
                CODE: "CS207A3",
                TITLE: "CG",
              },
              {
                CODE: "CS210A3",
                TITLE: "Microprocessor",
              },
            ],
          },
        }
      );
      console.log(`Inserted ${students.REGNO}`);
    }
  }
};
updateDB();
