const { MongoClient } = require("mongodb");
require("dotenv").config();
const parser = require("simple-excel-to-json");

const stuData = parser
  .parseXls2Json(__dirname + "/Student_List.xlsx")[0]
  .map((stu) => stu.REGNO);

console.log(stuData);

const updateSem = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();
  console.log(data);
  for (let [index, student] of data
    .filter((s) => s.CURRENT_SEM === 8)
    .entries()) {
    console.log(`Currently Checking ${student.REGNO}`);
    if (stuData.includes(student.REGNO)) {
      console.log(`Student is still there. ${student.REGNO}`);
      continue;
    } else {
      console.log(`Student already passed out (${student.REGNO})`);
      await collection.updateOne(
        { REGNO: student.REGNO },
        {
          $set: {
            CURRENT_SEM: 9,
          },
        },
      );
      console.log(`Student sem changed to 9 for ${student.REGNO}`);
    }
  }
  await client.close();
};

updateSem();
