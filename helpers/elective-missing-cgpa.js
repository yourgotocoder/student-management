const { MongoClient } = require("mongodb");
const { writeFileSync } = require("fs");
const json2xls = require("json2xls");
require("dotenv").config();

const filter_by_sem = (data, sem) => {
  return data.filter((student) => student.CURRENT_SEM === sem);
};

const filter_by_key = (data, key) => {
  return data.filter((student) => !student[key]);
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
              ELECTIVE_3: student.ELECTIVE_SELECTIONS.ELECTIVE_3,
              ELECTIVE_4: student.ELECTIVE_SELECTIONS.ELECTIVE_4,
            },
          }))
        : "Invalid Sem";
  return result;
};

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const studentData = await collection.find().toArray();

  const _4thData = map_electives_by_sem(
    filter_for_missing_selections(
      filter_by_key(filter_by_sem(studentData, 4), "CGPA"),
      "ELECTIVE_2",
    ),
    4,
  );

  const _6thData = map_electives_by_sem(
    filter_for_missing_selections(
      filter_by_key(filter_by_sem(studentData, 6), "CGPA"),
      "ELECTIVE_3",
    ),
    6,
  );
  console.log(_6thData);
  const _6thElectives = getOptions(_6thData);
  const _4thElectives = getOptions(_4thData);

  writeFileSync(
    `_4thElectiveCGPAMissing.xlsx`,
    json2xls(_4thElectives),
    "binary",
  );
  writeFileSync(
    `_6thElectiveCGPAMissing.xlsx`,
    json2xls(_6thElectives),
    "binary",
  );
  await client.close();
};

const getOptions = (data) => {
  const result = [];
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
        studentData[`${elective_key}_${option_key}`] = subjectTitle;
      }
    }
    result.push(studentData);
  }

  return result;
};

updateElective();
