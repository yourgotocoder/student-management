const { MongoClient } = require("mongodb");
require("dotenv").config();
const parser = require("simple-excel-to-json");

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = parser.parseXls2Json("./resources/_7thSemInternship.xlsx")[0];
  const filtered_data = data.filter((student) => student.REGNO !== "");
  console.log(filtered_data.length);
  for (let [index, student] of filtered_data.entries()) {
    console.log(`Updating for ${student.REGNO}`);
    let ELECTIVE_8_OPTIONS = [
      { CODE: "CS1759/CS1644", TITLE: "Artificial Intelligence" },
      { CODE: "CS1757", TITLE: "Internet of Things" },
      { CODE: "CS1631", TITLE: "Deep Learning" },
    ];

    let ELECTIVE_9_OPTIONS = [
      { CODE: "CS1640/CS1758", TITLE: "Computer Vision" },
      { CODE: "CS1659", TITLE: "Ethical Hacking" },
      { CODE: "CS1743", TITLE: "Cyber Security" },
    ];
    const studentData = await collection.findOne({ REGNO: student.REGNO });
    const elective_history = [];

    studentData.ELECTIVE_1 && elective_history.push(studentData.ELECTIVE_1);
    studentData.ELECTIVE_2 && elective_history.push(studentData.ELECTIVE_2);
    studentData.ELECTIVE_3 && elective_history.push(studentData.ELECTIVE_3);
    studentData.ELECTIVE_4 && elective_history.push(studentData.ELECTIVE_4);
    studentData.ELECTIVE_5 && elective_history.push(studentData.ELECTIVE_5);
    studentData.ELECTIVE_6 && elective_history.push(studentData.ELECTIVE_6);
    studentData.ELECTIVE_7 && elective_history.push(studentData.ELECTIVE_7);
    console.log(elective_history);
    ELECTIVE_8_OPTIONS = ELECTIVE_8_OPTIONS.filter((sub) => {
      const bool =
        elective_history.findIndex((el) => el.CODE === sub.CODE) === -1;
      console.log(bool);
      return bool;
    });
    ELECTIVE_9_OPTIONS = ELECTIVE_9_OPTIONS.filter((sub) => {
      const bool =
        elective_history.findIndex((el) => el.CODE === sub.CODE) === -1;
      console.log(bool);
      return bool;
    });

    if (student.MINOR_SPECIALIZATION && student.MINOR_SPECIALIZATION === "AI") {
      ELECTIVE_8_OPTIONS = ELECTIVE_8_OPTIONS.filter(
        (sub) =>
          sub.CODE !== "CS1741" &&
          sub.CODE !== "CS1759/CS1644" &&
          sub.CODE !== "CS1744",
      );
    }
    if (student.MINOR_SPECIALIZATION && student.MINOR_SPECIALIZATION === "CS") {
      ELECTIVE_8_OPTIONS = ELECTIVE_8_OPTIONS.filter(
        (sub) => sub.CODE !== "CS1734",
      );
      ELECTIVE_9_OPTIONS = ELECTIVE_9_OPTIONS.filter(
        (sub) =>
          sub.CODE !== "CS1659" &&
          sub.CODE !== "CS1733" &&
          sub.CODE !== "CS1743",
      );
    }
    if (student.MINOR_SPECIALIZATION && student.MINOR_SPECIALIZATION === "DS") {
      ELECTIVE_8_OPTIONS = ELECTIVE_8_OPTIONS.filter(
        (sub) => sub.CODE !== "CS1759/CS1644" && sub.CODE !== "CS1757",
      );
    }
    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_8_OPTIONS,
          ELECTIVE_9_OPTIONS,
        },
        $unset: {
          OPEN_ELECTIVE_2_OPTIONS: 0,
          "ELECTIVE_SELECTIONS.ELECTIVE_8": 0,
          "ELECTIVE_SELECTIONS.ELECTIVE_9": 0,
          "ELECTIVE_SELECTIONS.OPEN_ELECTIVE_2": 0,
        },
      },
    );
    console.log(`Updated ${index + 1} of ${filtered_data.length}`);
  }
  await client.close();
};

updateElective();
