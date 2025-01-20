const { MongoClient } = require("mongodb");
const { appendFileSync } = require("fs");
require("dotenv").config();

const getElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");

  const data = await collection.find().toArray();
  const _6thData = data.filter((student) => student.CURRENT_SEM === 6);

  const electives = [];

  for (let student of _6thData) {
    if (student.ELECTIVE_1 && !electives.includes(student.ELECTIVE_1.TITLE)) {
      electives.push(student.ELECTIVE_1.TITLE);
    }
    if (student.ELECTIVE_2 && !electives.includes(student.ELECTIVE_2.TITLE)) {
      electives.push(student.ELECTIVE_2.TITLE);
    }
    if (student.ELECTIVE_3 && !electives.includes(student.ELECTIVE_3.TITLE)) {
      electives.push(student.ELECTIVE_3.TITLE);
    }
    if (student.ELECTIVE_4 && !electives.includes(student.ELECTIVE_4.TITLE)) {
      electives.push(student.ELECTIVE_4.TITLE);
    }

    if (
      student.MINOR_SPECIALIZATION_1 &&
      !electives.includes(student.MINOR_SPECIALIZATION_1.TITLE)
    ) {
      electives.push(student.MINOR_SPECIALIZATION_1.TITLE);
    }
    if (
      student.MINOR_SPECIALIZATION_2 &&
      !electives.includes(student.MINOR_SPECIALIZATION_2.TITLE)
    ) {
      electives.push(student.MINOR_SPECIALIZATION_2.TITLE);
    }
    if (
      student.MINOR_SPECIALIZATION_3 &&
      !electives.includes(student.MINOR_SPECIALIZATION_3.TITLE)
    ) {
      electives.push(student.MINOR_SPECIALIZATION_3.TITLE);
    }
    if (
      student.MINOR_SPECIALIZATION_4 &&
      !electives.includes(student.MINOR_SPECIALIZATION_4.TITLE)
    ) {
      electives.push(student.MINOR_SPECIALIZATION_4.TITLE);
    }

    if (
      student.OPEN_ELECTIVE_1 &&
      !electives.includes(student.OPEN_ELECTIVE_1.TITLE)
    ) {
      electives.push(student.OPEN_ELECTIVE_1.TITLE);
    }
    if (
      student.OPEN_ELECTIVE_2 &&
      !electives.includes(student.OPEN_ELECTIVE_2.TITLE)
    ) {
      electives.push(student.OPEN_ELECTIVE_2.TITLE);
    }
  }
  console.log(electives, electives.length);
  for (let sub of electives) {
    appendFileSync("Sub.txt", sub + "\n");
  }
  await client.close();
};

getElective();
