const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();

  const _5thSemData = data.filter(
    (student) =>
      student.CURRENT_SEM &&
      student.CURRENT_SEM == 5 && student.REGNO === 202200448);


  for (let [index, student] of _5thSemData.entries()) {
    let ELECTIVE_3_OPTIONS = [
      { CODE: "CS305A3", TITLE: "Autonomous Mobile Robotics and Computational Intelligence" },
      { CODE: "CS311A3", TITLE: "Cryptography and Network Security" },
      { CODE: "CS315A3", TITLE: "Advanced Algorithm" },
      { CODE: "CS309A3", TITLE: "Computer Vision" },
      {
        CODE: "CS306A3",
        TITLE: "Internet of Things",
      },
    ];

    console.log(`Updating for ${student.REGNO}`);
    const elective_history = [];
    student.ELECTIVE_1 && elective_history.push(student.ELECTIVE_1);
    if (
      elective_history.findIndex((sub) => sub && sub.CODE === "CS221A3") === -1
    ) {
      ELECTIVE_3_OPTIONS.push(
        { CODE: "CS303A3", TITLE: "Speech and Natural Language Processing" },
      );
    }

    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_3_OPTIONS,
        },
      },
    );
    console.log(`Updated ${index + 1} of ${_5thSemData.length}`);
  }

  await client.close();
};

updateElective();
