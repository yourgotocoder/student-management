const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();

  const ELECTIVE_1_OPTIONS = [
    { CODE: "CS201A3", TITLE: "JAVA Programming" },
    { CODE: "CS202A3", TITLE: "Fundamentals of Web Technology" },
    { CODE: "CS203A3", TITLE: "UI/UX Design" },
    { CODE: "CS206A3", TITLE: "Microprocessor & Peripheral Devices" },
    { CODE: "CS207A3", TITLE: "Information Systems & Security" },
  ];

  const _3rdSemData = data.filter(
    (student) =>
      student.CURRENT_SEM &&
      student.CURRENT_SEM == 3 &&
      !student.ELECTIVE_1_OPTIONS,
  );
  for (let [index, student] of _3rdSemData.entries()) {
    console.log(`Updating for ${student.REGNO}`);
    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_1_OPTIONS,
        },
      },
    );
    console.log(`Updated ${index + 1} of ${_3rdSemData.length}`);
  }
  await client.close();
};

updateElective();
