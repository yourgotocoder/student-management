const parser = require("simple-excel-to-json");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async (data) => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  for (let [index, student] of data.entries()) {
    console.log(`Updating for ${student.REGNO}`);
    const found = await collection.findOne({ REGNO: student.REGNO });
    if (found) {
      await collection.updateOne(
        { REGNO: student.REGNO },
        {
          $set: { CGPA: student.CGPA },
        }
      );
    }
    console.log(`Updated ${index + 1} of ${data.length}`);
  }
};

const studentsData = parser.parseXls2Json("./resources/_6thCGPA.xlsx")[0];

updateElective(studentsData);
