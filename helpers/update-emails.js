const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateEmail = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();
  const filteredData = data.filter((student) => student.CURRENT_SEM === 3);
  for (let student of filteredData) {
    if (student) {
      await collection.updateOne(
        { REGNO: student.REGNO },
        {
          $set: {
            EMAIL_ID:
              student.NAME.split(" ")[0].toLowerCase() +
              "_" +
              student.REGNO +
              "@smit.smu.edu.in",
          },
        },
      );
    }
  }
  await client.close();
};

updateEmail();
