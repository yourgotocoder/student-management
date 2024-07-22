const { MongoClient } = require("mongodb");
const { writeFileSync } = require("fs");
const json2xls = require("json2xls");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const studentData = await collection.find().toArray();

  const _5thData = studentData
    .filter(
      (student) =>
        student.CURRENT_SEM === 5 &&
        student.BRANCH == "CSE" &&
        student.CGPA &&
        student.ELECTIVE_SELECTIONS &&
        student.ELECTIVE_SELECTIONS.ELECTIVE_2,
    )
    .sort((a, b) => b.CGPA - a.CGPA);
  const _5thXls = json2xls(
    alloter(_5thData).map((student) => ({
      REGNO: student.REGNO,
      CGPA: student.CGPA,
      ELECTIVE_2: student.ELECTIVE_2,
      OPEN_ELECTIVE_2: student.OPEN_ELECTIVE_2,
    })),
  );
  writeFileSync("_5thRevisedData.xlsx", _5thXls, "binary");
  await client.close();
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
          continue;
        } else {
          if (elective_key === "OPEN_ELECTIVE_2") {
            seats[elective_key][
              student.ELECTIVE_SELECTIONS[elective_key][option_key]["TITLE"]
            ] = 35;
          } else {
            if (
              student.ELECTIVE_SELECTIONS[elective_key][option_key]["TITLE"] ===
              "Digital Image Processing"
            ) {
              seats[elective_key][
                student.ELECTIVE_SELECTIONS[elective_key][option_key]["TITLE"]
              ] = 40;
            } else {
              seats[elective_key][
                student.ELECTIVE_SELECTIONS[elective_key][option_key]["TITLE"]
              ] = 45;
            }
          }
        }
      }
    }
  }

  const optimised_seats = {};

  for (let elective_key in seats) {
    // let total_selections = 0;
    // for (let key in seats[elective_key]) {
    //   total_selections++;
    // }
    // for (let key in seats[elective_key]) {
    //   optimised_seats[key] = 50;
    // }
    for (let key in seats[elective_key]) {
      optimised_seats[key] = seats[elective_key][key];
    }
  }

  // console.log(seats);
  const result = [];
  for (let student of data) {
    const student_obj = {
      REGNO: student.REGNO,
      CGPA: student.CGPA,
    };
    for (let elective_key in student.ELECTIVE_SELECTIONS) {
      for (let option in student.ELECTIVE_SELECTIONS[elective_key]) {
        if (
          elective_key === "OPEN_ELECTIVE_2" &&
          student_obj.ELECTIVE_2 &&
          student_obj.ELECTIVE_2 === "Artificial Intelligence" &&
          student.ELECTIVE_SELECTIONS["OPEN_ELECTIVE_2"][option]["TITLE"] ==
            "Introduction to Artificial Intelligence"
        ) {
          console.log(student_obj, student.ELECTIVE_SELECTIONS[elective_key]);
          continue;
        }
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
  // console.log(result);
  return result;
};

updateElective();
