const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();
  console.log(data);
  for (let [index, student] of data
    .filter((s) => s.CURRENT_SEM === 3)
    .entries()) {
    console.log(`Updating ${student.REGNO}`);
    await collection.updateOne(
      { REGNO: student.REGNO },
      { $set: { BRANCH: student.BRANCH.trim() } },
    );
    console.log(`Done ${index + 1} of ${data.length}`);
  }
};

updateElective();
