const parser = require("simple-excel-to-json");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();

  const ELECTIVE_1_OPTIONS = [
    { CODE: "CS202A3", TITLE: "Java" },
    { CODE: "CS206A3", TITLE: "ITCT" },
    { CODE: "CS207A3", TITLE: "CG" },
    { CODE: "CS210A3", TITLE: "Microprocessor" },
  ];

  const _4thSemData = data.filter(
    (student) =>
      student.CURRENT_SEM &&
      student.CURRENT_SEM == 4 &&
      !student.ELECTIVE_1_OPTIONS
  );
  for (let [index, student] of _4thSemData.entries()) {
    console.log(`Updating for ${student.REGNO}`);
    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_1_OPTIONS,
        },
      }
    );
    console.log(`Updated ${index + 1} of ${_4thSemData.length}`);
  }
  await client.close();
};

updateElective();
