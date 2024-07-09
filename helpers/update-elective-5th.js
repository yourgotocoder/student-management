const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();

  const _4thSemDataCSE = data.filter(
    (student) =>
      student.CURRENT_SEM &&
      student.CURRENT_SEM == 5 &&
      student.BRANCH == "CSE",
  );
  const _4thSemDataAIML = data.filter(
    (student) =>
      student.CURRENT_SEM &&
      student.CURRENT_SEM == 5 &&
      student.BRANCH == "CSE(AI&ML)",
  );

  for (let [index, student] of _4thSemDataCSE.entries()) {
    let ELECTIVE_2_OPTIONS = [
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

    let OPEN_ELECTIVE_2_OPTIONS = [
      { CODE: "AD301A2", TITLE: "Data Analytics using Python" },
      { CODE: "CE304A2", TITLE: "Air Pollution and Control" },
      { CODE: "EC3**A2", TITLE: "Introduction to Robotics" },
      { CODE: "EE303A2", TITLE: "Fuzzy Logic and Evolutionary Algorithm" },
      { CODE: "IT321A2", TITLE: "Introduction to Artificial Intelligence" },
      { CODE: "ME301A2", TITLE: "Energy Management" },
    ];

    console.log(`Updating for ${student.REGNO}`);
    const elective_history = [];
    student.ELECTIVE_1 && elective_history.push(student.ELECTIVE_1);
    if (
      elective_history.findIndex((sub) => sub && sub.CODE === "CS202A3") === -1
    ) {
      OPEN_ELECTIVE_2_OPTIONS.push({
        CODE: "CS301A2/CSML301A2",
        TITLE: "Programming with JAVA",
      });
    }
    if (
      student.MINOR_SPECIALIZATION &&
      (student.MINOR_SPECIALIZATION === "ARTIFICIAL INTELLIGENCE" ||
        student.MINOR_SPECIALIZATION === "DATA SCIENCE")
    ) {
      ELECTIVE_2_OPTIONS = ELECTIVE_2_OPTIONS.filter(
        (sub) => sub.CODE !== "CS314A3",
      );
    }
    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_2_OPTIONS,
          OPEN_ELECTIVE_2_OPTIONS,
        },
      },
    );
    console.log(`Updated ${index + 1} of ${_4thSemDataCSE.length}`);
  }
  for (let [index, student] of _4thSemDataAIML.entries()) {
    console.log(`Updating for ${student.REGNO}`);
    let ELECTIVE_2_OPTIONS = [
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

    let OPEN_ELECTIVE_2_OPTIONS = [
      { CODE: "AD301A2", TITLE: "Data Analytics using Python" },
      { CODE: "CE304A2", TITLE: "Air Pollution and Control" },
      { CODE: "EC3**A2", TITLE: "Introduction to Robotics" },
      { CODE: "EE303A2", TITLE: "Fuzzy Logic and Evolutionary Algorithm" },
      { CODE: "IT321A2", TITLE: "Introduction to Artificial Intelligence" },
      { CODE: "ME301A2", TITLE: "Energy Management" },
    ];

    console.log(`Updating for ${student.REGNO}`);
    const elective_history = [];
    student.ELECTIVE_1 && elective_history.push(student.ELECTIVE_1);
    if (
      student.MINOR_SPECIALIZATION &&
      (student.MINOR_SPECIALIZATION === "ARTIFICIAL INTELLIGENCE" ||
        student.MINOR_SPECIALIZATION === "DATA SCIENCE")
    ) {
      ELECTIVE_2_OPTIONS = ELECTIVE_2_OPTIONS.filter(
        (sub) => sub.CODE !== "CS314A3",
      );
    }
    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_2_OPTIONS,
          OPEN_ELECTIVE_2_OPTIONS,
        },
      },
    );
    console.log(`Updated ${index + 1} of ${_4thSemDataAIML.length}`);
  }
  await client.close();
};

updateElective();
