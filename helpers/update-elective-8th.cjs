const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();

  const _8thSemData = data.filter(
    (student) =>
      student.CURRENT_SEM &&
      student.CURRENT_SEM == 8 &&
      !student.ELECTIVE_5_OPTIONS,
  );
  console.log(_8thSemData.length);
  for (let [index, student] of _8thSemData.entries()) {
    console.log(`Updating for ${student.REGNO}`);
    let ELECTIVE_5_OPTIONS = [
      { CODE: "CS401A3", TITLE: "Distributed Systems" },
      { CODE: "CS404A3", TITLE: "Cyber Security" },
      {
        CODE: "CS40XA3",
        TITLE: "Algorithmic Graph Theory and Data Structures",
      },
      { CODE: "CS40CA3", TITLE: "Business Intelligence & Analytics" },
    ];

    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_5_OPTIONS,
        },
      },
    );
    console.log(`Updated ${index + 1} of ${_8thSemData.length}`);
  }
  await client.close();
};

updateElective();
