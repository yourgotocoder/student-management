const { MongoClient } = require("mongodb");
const { writeFileSync } = require("fs");
const json2xls = require("json2xls");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const studentData = await collection.find().toArray();
  const branch_data = segregate_by_branch(studentData);

  for (let sem_data of branch_data) {
    const Branch = sem_data.BRANCH;
    for (let sem_key in sem_data.data) {
      sem_data.data[sem_key].sort((a, b) => b.CGPA - a.CGPA);
    }
    for (let sem_key in sem_data.data) {
      const allocated_data = alloter(sem_data.data[sem_key]);
      if (Branch === "CSE(IoT)") {
        console.log(allocated_data);
      }
    }
  }

  await client.close();
};

// Data should look like [{ Branch, SEM_NO: [Data]}]
const segregate_by_branch = (data) => {
  const branch_data = data.reduce((accumulator, student) => {
    const foundIndex = accumulator.findIndex(
      (branchData) => branchData.BRANCH === student.BRANCH,
    );
    if (foundIndex === -1) {
      accumulator.push({
        BRANCH: student.BRANCH,
        data: {
          [student.CURRENT_SEM]: [student],
        },
      });
    } else {
      if (!accumulator[foundIndex].data[student.CURRENT_SEM]) {
        accumulator[foundIndex].data[student.CURRENT_SEM] = [student];
      } else {
        accumulator[foundIndex].data[student.CURRENT_SEM].push(student);
      }
    }
    return accumulator;
  }, []);
  return branch_data;
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
