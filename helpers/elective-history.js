const { MongoClient } = require("mongodb");
require("dotenv").config();

const electiveHistory = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();
  const _7thSemData = data.filter((student) => student.CURRENT_SEM === 7);
  const subjects = [{ TITLE: "", CODE: "" }];
  for (let [index, student] of _7thSemData.entries()) {
    if (
      !subjects.find(
        (sub) => sub.CODE === (student.ELECTIVE_1 && student.ELECTIVE_1.CODE),
      )
    ) {
      student.ELECTIVE_1 && subjects.push(student.ELECTIVE_1);
    }
    if (
      !subjects.find(
        (sub) => sub.CODE === (student.ELECTIVE_2 && student.ELECTIVE_2.CODE),
      )
    ) {
      student.ELECTIVE_2 && subjects.push(student.ELECTIVE_2);
    }
    if (
      !subjects.find(
        (sub) => sub.CODE === (student.ELECTIVE_3 && student.ELECTIVE_3.CODE),
      )
    ) {
      student.ELECTIVE_3 && subjects.push(student.ELECTIVE_3);
    }
    if (
      !subjects.find(
        (sub) => sub.CODE === (student.ELECTIVE_4 && student.ELECTIVE_4.CODE),
      )
    ) {
      student.ELECTIVE_4 && subjects.push(student.ELECTIVE_4);
    }
    if (
      !subjects.find(
        (sub) => sub.CODE === (student.ELECTIVE_5 && student.ELECTIVE_5.CODE),
      )
    ) {
      student.ELECTIVE_5 && subjects.push(student.ELECTIVE_5);
    }
    if (
      !subjects.find(
        (sub) => sub.CODE === (student.ELECTIVE_6 && student.ELECTIVE_6.CODE),
      )
    ) {
      student.ELECTIVE_6 && subjects.push(student.ELECTIVE_6);
    }
    if (
      !subjects.find(
        (sub) => sub.CODE === (student.ELECTIVE_7 && student.ELECTIVE_7.CODE),
      )
    ) {
      student.ELECTIVE_7 && subjects.push(student.ELECTIVE_7);
    }
  }
  console.log(subjects);
  await client.close();
};

electiveHistory();
