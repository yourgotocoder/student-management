const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();

  const ELECTIVE_2_OPTIONS = [
    { CODE: "CS207A3", TITLE: "Advanced Java Programming" },
    { CODE: "CS214A3", TITLE: "Social Network Analysis" },
    { CODE: "CS217A3", TITLE: "Information Retrieval" },
    {
      CODE: "CS219A3",
      TITLE: "Advanced Computer Organization and Architecture",
    },
    { CODE: "CS220A3", TITLE: "Principles of Programming Languages" },
    { CODE: "CS213A3", TITLE: "Embedded Systems" },
  ];

  const _4thSemData = data.filter(
    (student) => student.CURRENT_SEM && student.CURRENT_SEM == 4,
  );
  for (let [index, student] of _4thSemData.entries()) {
    console.log(`Updating for ${student.REGNO}`);
    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_2_OPTIONS,
        },
      },
    );
    console.log(`Updated ${index + 1} of ${_4thSemData.length}`);
  }
  await client.close();
};

updateElective();
