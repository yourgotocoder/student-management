const { MongoClient } = require("mongodb");
const generatePassword = require("generate-password");
require("dotenv").config();

const updatePassword = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const cse_data = await collection.find().toArray();
  for (let [index, student] of cse_data.entries()) {
    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          DEFAULT_PASSWORD: generatePassword.generate({ length: 10 }),
        },
      }
    );
    console.log(`${index + 1} of ${cse_data.length} done`)
  }
  console.log(`Update password`)
};

updatePassword();