const { MongoClient } = require("mongodb");
require("dotenv").config();
const { appendFileSync } = require("fs");

const updateStudentSemester = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const db_data = await collection.find().toArray();
  for (student of db_data) {
    if (student.CURRENT_SEM !== 8) {
      let current_semester = student.CURRENT_SEM;
      await collection.updateOne(
        { REGNO: student.REGNO },
        {
          $set: { CURRENT_SEM: current_semester + 1 },
          $unset: { CURRENT_SEMESTER: 1 },
        },
      );
      const getDate = new Date();
      const logInfo = `${student.REGNO} (${student.NAME}) promoted from ${current_semester} to ${current_semester + 1} on ${getDate.getDate()}\n`;
      appendFileSync(__dirname + "PromotionLog.txt", logInfo);
      console.log(`Updating record for ${student.NAME}`);
    }
  }
};

updateStudentSemester();
