const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const studentData = await collection.find().toArray();
  const _4thData = studentData
    .filter(
      (student) =>
        student.CURRENT_SEM === 4 &&
        student.CGPA &&
        student.ELECTIVE_SELECTIONS &&
        student.BRANCH === "CSE"
    )
    .sort((a, b) => b.CGPA - a.CGPA);
  const _4thDataAIML = studentData
    .filter(
      (student) =>
        student.CURRENT_SEM === 4 &&
        student.CGPA &&
        student.ELECTIVE_SELECTIONS &&
        student.BRANCH === "CSE(AI&ML)"
    )
    .sort((a, b) => b.CGPA - a.CGPA);

  const _6thData = studentData
    .filter(
      (student) =>
        student.CURRENT_SEM === 6 && student.CGPA && student.ELECTIVE_SELECTIONS
    )
    .sort((a, b) => b.CGPA - a.CGPA);
  alloter(_4thDataAIML);
};

const alloter = (data) => {
  const seats = {};
  for (let student of data) {
    for (let elective_key in student.ELECTIVE_SELECTIONS) {
      let total_selections = 0;
      seats[elective_key] = {};
      for (let option_key in student.ELECTIVE_SELECTIONS[elective_key]) {
        total_selections++;
        if (
          seats[elective_key][
          student.ELECTIVE_SELECTIONS[elective_key][option_key]["TITLE"]
          ]
        ) {
          seats[elective_key][
            student.ELECTIVE_SELECTIONS[elective_key][option_key]["TITLE"]
          ]++;
        } else {
          seats[elective_key][
            student.ELECTIVE_SELECTIONS[elective_key][option_key]["TITLE"]
          ] = 1;
        }
      }
    }
  }

  const optimised_seats = {};

  for (let elective_key in seats) {
    let total_selections = 0;
    for (let key in seats[elective_key]) {
      total_selections++;
    }
    for (let key in seats[elective_key]) {
      optimised_seats[key] = Math.ceil(
        (seats[elective_key][key] / total_selections) * data.length
      );
    }
  }
  const result = [];
  for (let student of data) {
    const student_obj = {
      REGNO: student.REGNO,
      CGPA: student.CGPA,
    };
    for (let elective_key in student.ELECTIVE_SELECTIONS) {
      for (let option in student.ELECTIVE_SELECTIONS[elective_key]) {
        if (
          optimised_seats[
          student.ELECTIVE_SELECTIONS[elective_key][option]["TITLE"]
          ] > 0
        ) {
          student_obj[elective_key] =
            student.ELECTIVE_SELECTIONS[elective_key][option]["TITLE"];
          optimised_seats[
            student.ELECTIVE_SELECTIONS[elective_key][option]["TITLE"]
          ]--;
          break;
        }
      }
    }
    result.push(student_obj);
  }
  console.log(optimised_seats);
  console.log(result);
  return result;
};

updateElective();
