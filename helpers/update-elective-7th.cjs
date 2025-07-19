const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();

  const _7thSemData = data.filter(
    (student) => student.CURRENT_SEM && student.CURRENT_SEM == 7,
  );
  console.log(_7thSemData.length);
  for (let [index, student] of _7thSemData.entries()) {
    console.log(`Updating for ${student.REGNO}`);
    let OPEN_ELECTIVE_4_OPTIONS = [
      { CODE: "CS401A2", TITLE: "Distributed Systems" },
      { CODE: "CS403A2", TITLE: "History of Science" },
      { CODE: "NPTEL_CS109", TITLE: "Software Project Management" },
      { CODE: "NPTEL_CS143", TITLE: "Computer Vision" },
      { CODE: "NPTEL_CS118", TITLE: "Responsible and Safe AI Systems" },
      { CODE: "NPTEL_CS161", TITLE: "Introduction to Large Language Models" },
      { CODE: "AD401A2", TITLE: "Biometric Technology" },
      { CODE: "CE403A2", TITLE: "Disaster Management" },
      { CODE: "EE402A2", TITLE: "Machine Learning" },
      { CODE: "EC401A2", TITLE: "IIoT and Industry 4.0" },
      { CODE: "IT442A2", TITLE: "Introduction to E Governance" },
      { CODE: "ME401A2", TITLE: "Statistical Methods for Data Analytics" },
      { CODE: "MA4318A8", TITLE: "Basics of Financial Mathematics" }
    ];

    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          OPEN_ELECTIVE_4_OPTIONS: OPEN_ELECTIVE_4_OPTIONS,
        },
      },
    );
    console.log(`Updated ${index + 1} of ${_7thSemData.length}`);
  }
  await client.close();
};

updateElective();
