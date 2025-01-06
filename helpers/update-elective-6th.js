const parser = require("simple-excel-to-json");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();

  const _6thSemData = data.filter(
    (student) => student.CURRENT_SEM && student.CURRENT_SEM == 6,
  );
  console.log(_6thSemData.length);
  for (let [index, student] of _6thSemData.entries()) {
    console.log(`Updating for ${student.REGNO}`);
    let ELECTIVE_3_OPTIONS = [
      {
        CODE: "CS333A3",
        TITLE: "Autonomous Mobile Robotics & Computational Intelligence",
      },
      { CODE: "CS339A3", TITLE: "Internet of Things" },
      { CODE: "CS340A3", TITLE: "Block Chain Coding" },
      { CODE: "CS348A3", TITLE: "AdHoc Wireless Networks" },
      { CODE: "CS352A3", TITLE: "Advanced Operating Systems" },
      { CODE: "CS338A3", TITLE: "Human Computer Interaction (NPTEL)" },
      {
        CODE: "CS357A3",
        TITLE: "Object Oriented Analysis and Design using UML (NPTEL)",
      },
    ];

    let ELECTIVE_4_OPTIONS = [
      { CODE: "CS335A3", TITLE: "Machine Learning" },
      { CODE: "CS336A3", TITLE: "Ethical Hacking" },
      { CODE: "CS326A3", TITLE: "Agile Methodology" },
      { CODE: "CS330A3", TITLE: "Speech and Natural Language Processing" },
      { CODE: "CS344A3", TITLE: "Cloud Computing" },
      { CODE: "CS345A3", TITLE: "Deep Learning (NPTEL)" },
      { CODE: "CS349A3", TITLE: "Cryptography and Network Security (NPTEL)" },
    ];

    if (student.BRANCH !== "CSE") {
      ELECTIVE_3_OPTIONS = ELECTIVE_3_OPTIONS.filter(
        (sub) => sub.CODE !== "CS352A3",
      );
      ELECTIVE_3_OPTIONS = ELECTIVE_3_OPTIONS.filter(
        (sub) => sub.CODE !== "CS357A3",
      );

      ELECTIVE_4_OPTIONS = ELECTIVE_4_OPTIONS.filter(
        (sub) => sub.CODE !== "CS335A3",
      );
      ELECTIVE_4_OPTIONS = ELECTIVE_4_OPTIONS.filter(
        (sub) => sub.CODE !== "CS345A3",
      );
    }

    if (student.MINOR_SPECIALIZATION === "AI") {
      ELECTIVE_3_OPTIONS = ELECTIVE_3_OPTIONS.filter(
        (sub) => sub.CODE !== "CS333A3",
      );
      ELECTIVE_3_OPTIONS = ELECTIVE_3_OPTIONS.filter(
        (sub) => sub.CODE !== "CS340A3",
      );
      ELECTIVE_4_OPTIONS = ELECTIVE_4_OPTIONS.filter(
        (sub) => sub.CODE !== "CS335A3",
      );
    }

    if (student.MINOR_SPECIALIZATION === "CS") {
      ELECTIVE_3_OPTIONS = ELECTIVE_3_OPTIONS.filter(
        (sub) => sub.CODE !== "CS340A3",
      );
      ELECTIVE_4_OPTIONS = ELECTIVE_4_OPTIONS.filter(
        (sub) => sub.CODE !== "CS349A3",
      );
    }

    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_3_OPTIONS,
          ELECTIVE_4_OPTIONS,
        },
      },
    );
    console.log(`Updated ${index + 1} of ${_6thSemData.length}`);
  }
  await client.close();
};

updateElective();
