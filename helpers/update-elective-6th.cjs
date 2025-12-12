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
    let ELECTIVE_4_OPTIONS = [
      { CODE: "CS320A3", TITLE: "Deep Learning" },
      { CODE: "CS321A3", TITLE: "Cloud Computing" },
      { CODE: "CS323A3", TITLE: "Ethical Hacking" },
      { CODE: "CS324A3", TITLE: "Ad-hoc Wireless Networks" },
      { CODE: "CS326A3", TITLE: "Distributed Database Systems" },
      { CODE: "CS328A3", TITLE: "Advanced Computer Networks" },
    ];

    let ELECTIVE_5_OPTIONS = [
      { CODE: "CS333A3", TITLE: "Cyber Security" },
      { CODE: "CS335A3", TITLE: "Distributed Systems" },
      { CODE: "CS338A3", TITLE: "Human Computer Interaction" },
      { CODE: "CS340A3", TITLE: "Blockchain" },
      { CODE: "CS341A3", TITLE: "Agile" },
      { CODE: "CS347A3", TITLE: "Reinforcement Learning" },
    ];

    if (student.BRANCH === "CSE(IoT)") {
      ELECTIVE_5_OPTIONS = ELECTIVE_5_OPTIONS.filter(
        (sub) =>
          sub.TITLE !== "Cyber Security" &&
          sub.TITLE !== "Distributed Systems" &&
          sub.TITLE !== "Agile",
      );
    }

    if (student.BRANCH === "CSE(AI&ML)") {
      ELECTIVE_5_OPTIONS = ELECTIVE_5_OPTIONS.filter(
        (sub) => sub.TITLE !== "Agile",
      );
    }

    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_4_OPTIONS,
          ELECTIVE_5_OPTIONS,
        },
      },
    );
    console.log(`Updated ${index + 1} of ${_6thSemData.length}`);
  }
  await client.close();
};

updateElective();
