const parser = require("simple-excel-to-json");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();

  const _6thSemData = data.filter(
    (student) =>
      student.CURRENT_SEM &&
      student.CURRENT_SEM == 6 &&
      !student.ELECTIVE_5_OPTIONS
  );
  console.log(_6thSemData.length);
  for (let [index, student] of _6thSemData.entries()) {
    console.log(`Updating for ${student.REGNO}`);
    let ELECTIVE_5_OPTIONS = [
      { CODE: "CS1659", TITLE: "Ethical Hacking" },
      { CODE: "CS1646", TITLE: "Speech and Natural Language Processing" },
      { CODE: "CS1756", TITLE: "R Programming" },
      { CODE: "CS1742", TITLE: "Data Analytics" },
    ];

    let ELECTIVE_6_OPTIONS = [
      { CODE: "CS1741", TITLE: "Machine Learning" },
      { CODE: "CS1631", TITLE: "Deep Learning" },
      { CODE: "CS1648", TITLE: "Signal and Networks" },
      { CODE: "CS1732", TITLE: "Cloud Computing" },
      { CODE: "CS1757", TITLE: "Internet of Things" },
    ];

    let ELECTIVE_7_OPTIONS = [
      { CODE: "CS1650", TITLE: "Agile Methodology" },
      { CODE: "CS1723", TITLE: "Big Data" },
      { CODE: "CS1760", TITLE: "Block Chain Coding" },
      { CODE: "CS1641", TITLE: "Social Network Analysis" },
    ];
    if (student.MINOR_SPECIALIZATION === "AI") {
      ELECTIVE_5_OPTIONS = ELECTIVE_5_OPTIONS.filter(
        (sub) => sub.TITLE !== "Speech and Natural Language Processing"
      );
      ELECTIVE_6_OPTIONS = ELECTIVE_6_OPTIONS.filter(
        (sub) => sub.TITLE !== "Machine Learning"
      );
      ELECTIVE_7_OPTIONS = ELECTIVE_7_OPTIONS.filter(
        (sub) => sub.TITLE !== "Block Chain Coding"
      );
    } else if (student.MINOR_SPECIALIZATION === "EH") {
      ELECTIVE_5_OPTIONS = ELECTIVE_5_OPTIONS.filter(
        (sub) => sub.TITLE !== "Ethical Hacking"
      );
      ELECTIVE_6_OPTIONS = ELECTIVE_6_OPTIONS.filter(
        (sub) => sub.TITLE !== "Signal and Networks"
      );
      ELECTIVE_7_OPTIONS = ELECTIVE_7_OPTIONS.filter(
        (sub) => sub.TITLE !== "Block Chain Coding"
      );
    }
    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_5_OPTIONS,
          ELECTIVE_6_OPTIONS,
          ELECTIVE_7_OPTIONS,
        },
      }
    );
    console.log(`Updated ${index + 1} of ${_6thSemData.length}`);
  }
};

updateElective();
