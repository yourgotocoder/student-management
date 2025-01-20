const { MongoClient } = require("mongodb");
const { writeFileSync } = require("fs");
const json2xls = require("json2xls");
require("dotenv").config();

const filter_by_sem = (data, sem) => {
  return data.filter((student) => student.CURRENT_SEM === sem);
};

const sort_by_cgpa = (data) => {
  const copy_of_data = [...data];
  return copy_of_data.sort((a, b) => b.CGPA - a.CGPA);
};

const filter_by_key = (data, key) => {
  return data.filter((student) => student[key]);
};

const filter_for_missing_selections = (data, elective) => {
  return data.filter(
    (student) =>
      student.ELECTIVE_SELECTIONS && student.ELECTIVE_SELECTIONS[elective],
  );
};

const map_electives_by_sem = (data, sem) => {
  const result =
    sem === 4
      ? data.map((student) => ({
        REGNO: student.REGNO,
        NAME: student.NAME,
        BRANCH: student.BRANCH,
        CGPA: student.CGPA,
        ELECTIVE_SELECTIONS: {
          ELECTIVE_2: student.ELECTIVE_SELECTIONS.ELECTIVE_2,
        },
      }))
      : sem === 6
        ? data.map((student) => ({
          REGNO: student.REGNO,
          NAME: student.NAME,
          BRANCH: student.BRANCH,
          CGPA: student.CGPA,
          ELECTIVE_SELECTIONS: {
            OPEN_ELECTIVE_3: student.ELECTIVE_SELECTIONS.OPEN_ELECTIVE_3,
          },
        }))
        : sem === 8
          ? data.map((student) => ({
            REGNO: student.REGNO,
            NAME: student.NAME,
            BRANCH: student.BRANCH,
            CGPA: student.CGPA,
            ELECTIVE_SELECTIONS: {
              ELECTIVE_10: student.ELECTIVE_SELECTIONS.ELECTIVE_10,
              ELECTIVE_11: student.ELECTIVE_SELECTIONS.ELECTIVE_11,
            },
          }))
          : "Invalid Option";
  return result;
};

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const studentData = await collection.find().toArray();

  // const _4thData = map_electives_by_sem(
  //   filter_for_missing_selections(
  //     sort_by_cgpa(filter_by_key(filter_by_sem(studentData, 4), "CGPA")),
  //     "ELECTIVE_2",
  //   ),
  //   4,
  // );

  // const _8thData = map_electives_by_sem(
  //   filter_for_missing_selections(
  //     sort_by_cgpa(filter_by_key(filter_by_sem(studentData, 8), "CGPA")),
  //     "ELECTIVE_10",
  //   ),
  //   8,
  // );

  // console.log(_8thData);

  // console.log(_4thData);
  //
  const _6thData = map_electives_by_sem(
    filter_for_missing_selections(
      sort_by_cgpa(filter_by_key(filter_by_sem(studentData, 6), "CGPA")),
      "OPEN_ELECTIVE_3",
    ),
    6,
  );

  const _6thElectives = alloter(_6thData, 50);
  // const _4thElectives = alloter(_4thData, 50);
  // const _8thElectives = alloter(_8thData, 10);

  writeFileSync(
    `_6thOpenElective.xlsx`,
    json2xls(_6thElectives.result),
    "binary",
  );
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

const alloter = (data, minSeats) => {
  const seats = {};
  let totalSelections = 0;
  const result = [];

  for (let student of data) {
    for (let elective_key in student["ELECTIVE_SELECTIONS"]) {
      for (let option_key in student["ELECTIVE_SELECTIONS"][elective_key]) {
        totalSelections++;
        const subjectTitle =
          student["ELECTIVE_SELECTIONS"][elective_key][option_key]["TITLE"];
        if (!seats[subjectTitle]) {
          seats[subjectTitle] = minSeats;
        }
      }
    }
  }

  for (let student of data) {
    const studentData = {
      REGNO: student.REGNO,
      NAME: student.NAME,
      BRANCH: student.BRANCH,
      CGPA: student.CGPA,
    };
    for (let elective_key in student["ELECTIVE_SELECTIONS"]) {
      for (let option_key in student["ELECTIVE_SELECTIONS"][elective_key]) {
        const subjectTitle =
          student["ELECTIVE_SELECTIONS"][elective_key][option_key]["TITLE"];
        if (seats[subjectTitle] > 0) {
          studentData[elective_key] = subjectTitle;
          seats[subjectTitle]--;
          break;
        }
      }
      for (let option_key in student["ELECTIVE_SELECTIONS"][elective_key]) {
        const subjectTitle =
          student["ELECTIVE_SELECTIONS"][elective_key][option_key]["TITLE"];
        studentData[`${elective_key}_${option_key}`] = subjectTitle;
      }
    }
    result.push(studentData);
  }

  return { result, seats };
};

updateElective();
