const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();
  console.log(data);
  for (let [index, student] of data.entries()) {
    console.log(`Updating ${student.REGNO}`);
    await collection.updateOne(
      { REGNO: student.REGNO },
      { $set: { CURRENT_SEM: student.CURRENT_SEM + 1, BRANCH: "CSE" } }
    );
    console.log(`Done ${index + 1} of ${data.length}`);
  }
};

updateElective();
