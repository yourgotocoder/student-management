const parser = require("simple-excel-to-json");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async (data) => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  for (let [index, student] of data.entries()) {
    if (student.MINOR !== "") {
      const foundStudent = await collection.findOne({
        REGNO: student["REGNO"],
      });
      if (foundStudent) {
        await collection.updateOne(
          { REGNO: student["REGNO"] },
          {
            $set: {
              MINOR_SPECIALIZATION:
                student.MINOR === "Artificial Intelligence"
                  ? "AI"
                  : student.MINOR === "Ethical Hacking and Data"
                    ? "CS"
                    : null,
            },
          },
        );
      }
      console.log(
        `Student: ${student.NAME}(${student["REGNO"]}) Updated ${index + 1} of ${data.length}`,
      );
    }
  }
  await client.close();
};

const studentsData = parser.parseXls2Json("./resources/_6th_Minor.xlsx")[0];

updateElective(studentsData);
