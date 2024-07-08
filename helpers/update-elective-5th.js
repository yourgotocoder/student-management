const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();

  const ELECTIVE_2_OPTIONS = [
    { CODE: "CS302A3", TITLE: "Adv. JAVA Programming" },
    { CODE: "CS314A3", TITLE: "Artificial Intelligence" },
    { CODE: "CS309A3", TITLE: "Digital Image Processing" },
    { CODE: "CS318A3", TITLE: "Social Network Analysis" },
    { CODE: "CS312A3", TITLE: "Information Retrieval" },
    {
      CODE: "CS322A3",
      TITLE: "Human Resource Development & Organization Behavior",
    },
  ];

  const ELECTIVE_2_OPTIONS_AIML = [
    { CODE: "CSML302A3", TITLE: "Adv. JAVA Programming" },
    { CODE: "CSML308A3", TITLE: "Digital Image Processing" },
    { CODE: "CSML315A3", TITLE: "Social Network Analysis" },
    { CODE: "CSML309A3", TITLE: "Information Retrieval" },
  ];

  const _4thSemDataCSE = data.filter(
    (student) =>
      student.CURRENT_SEM &&
      student.CURRENT_SEM == 5 &&
      !student.ELECTIVE_2_OPTIONS &&
      student.BRANCH == "CSE",
  );
  const _4thSemDataAIML = data.filter(
    (student) =>
      student.CURRENT_SEM &&
      student.CURRENT_SEM == 5 &&
      !student.ELECTIVE_2_OPTIONS &&
      student.BRANCH == "CSE(AI&ML)",
  );

  for (let [index, student] of _4thSemDataCSE.entries()) {
    console.log(`Updating for ${student.REGNO}`);
    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_2_OPTIONS,
        },
      },
    );
    console.log(`Updated ${index + 1} of ${_4thSemDataCSE.length}`);
  }
  for (let [index, student] of _4thSemDataAIML.entries()) {
    console.log(`Updating for ${student.REGNO}`);
    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_2_OPTIONS: ELECTIVE_2_OPTIONS_AIML,
        },
      },
    );
    console.log(`Updated ${index + 1} of ${_4thSemDataAIML.length}`);
  }
  await client.close();
};

updateElective();
