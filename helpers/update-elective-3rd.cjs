const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();

  const ELECTIVE_1_OPTIONS = [
    { CODE: "CS201A3", TITLE: "JAVA Programming" },
    { CODE: "CS204A3", TITLE: "Information Transmission and Coding Theory" },
    { CODE: "CS205A3", TITLE: "Computer Graphics" },
    { CODE: "CS206A3", TITLE: "Microprocessor and Peripheral devices" },
    { CODE: "CS224A3", TITLE: "Information Systems and Security" },
    { CODE: "CS227A3", TITLE: "Mathematical Foundation for Machine Learning" }
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
