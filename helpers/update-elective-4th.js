const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();

  const ELECTIVE_2_OPTIONS = [
    { CODE: "CS221A3", TITLE: "Speech Processing" },
    { CODE: "CS216A3", TITLE: "Signals & Networks" },
    { CODE: "CS217A3", TITLE: "Information Retrieval" },
    { CODE: "CS207A3", TITLE: "Advanced Java Programming" },
    { CODE: "CS219A3", TITLE: "Advanced COA" },
    { CODE: "CS213A3", TITLE: "Embedded Systems(NPTEL)" },
    { CODE: "CS215A3", TITLE: "VlSI(NPTEL)" },
  ];

  const OPEN_ELECTIVE_2_OPTIONS = [
    {
      CODE: "CS202A2",
      TITLE: "Computational Problem Solving (Industry Version 5.0)",
    },
    { CODE: "CS204A2", TITLE: "Social Network Analysis" },
    { CODE: "CS206A2", TITLE: "Digital Image Processing" },
    { CODE: "CS208A2", TITLE: "Graph Theory" },
    { CODE: "CS210A2", TITLE: "Computational Problem Solving (AIS)" },
  ];

  const _4thSemData = data.filter(
    (student) =>
      student.CURRENT_SEM &&
      student.CURRENT_SEM == 4 &&
      !student.ELECTIVE_2_OPTIONS,
  );
  for (let [index, student] of _4thSemData.entries()) {
    console.log(`Updating for ${student.REGNO}`);
    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_2_OPTIONS,
          OPEN_ELECTIVE_2_OPTIONS,
        },
      },
    );
    console.log(`Updated ${index + 1} of ${_4thSemData.length}`);
  }
  await client.close();
};

updateElective();
