const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElectiveOptions = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const cse_data = await collection.find().toArray();
  const _6thSemStudents = cse_data.filter(
    (student) => student.CURRENT_SEM === 6
  );
  for (let [index, student] of _6thSemStudents.entries()) {
    const ELECTIVE_4 = [{ CODE: "CS1742", TITLE: "Data Analytics" }];
    const ELECTIVE_5 = [{ CODE: "CS1756", TITLE: "R Programming" }];
    const AI = "CS1759/CS1644 ARTIFICIAL INTELLIGENCE";
    const minor_AI = "AI";
    const minor_CS = "CS";
    const minor_DS = "DS";
    const minor_IoT = "IoT";
    if (student.MINOR_SPECIALIZATION !== minor_AI) {
      ELECTIVE_4.push({ CODE: "CS1741", TITLE: "Machine Learning" });
    }
    if (student.MINOR_SPECIALIZATION !== minor_CS) {
      ELECTIVE_4.push({ CODE: "CS1648", TITLE: "Signals and Networks" });
    }
    if (student.MINOR_SPECIALIZATION !== minor_CS) {
      ELECTIVE_4.push({ CODE: "CS1659", TITLE: "Ethical Hacking" });
    }

    if (
      student.MINOR_SPECIALIZATION !== minor_AI &&
      student.MINOR_SPECIALIZATION !== minor_CS
    ) {
      ELECTIVE_5.push({ CODE: "CS1760", TITLE: "Block Chain Coding" });
    }
    if (student.MINOR_SPECIALIZATION !== minor_DS) {
      ELECTIVE_5.push({ CODE: "CS1723", TITLE: "Big Data" });
    }
    if (student.MINOR_SPECIALIZATION !== minor_IoT) {
      ELECTIVE_5.push({ CODE: "CS1732", TITLE: "Cloud Computing" });
    }

    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_4_OPTIONS: ELECTIVE_4,
          ELECTIVE_5_OPTIONS: ELECTIVE_5,
        },
        $unset: {
          ELECTIVE_SELECTIONS: {},
        },
      }
    );

    console.log(`${index + 1} of ${_6thSemStudents.length} done`);
  }
  console.log("Updated elective options!!");
};

updateElectiveOptions();
