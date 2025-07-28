const parser = require("simple-excel-to-json");
const { MongoClient } = require("mongodb");
const json2xls = require("json2xls");
const { writeFileSync } = require("fs")
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = parser.parseXls2Json("./resources/_7thElective.xlsx")[0];

  const db_data = await collection.find().toArray();
  const _7thData = db_data.filter(student => student.CURRENT_SEM === 7)

  const missing_electives = []

  for (let student of _7thData) {
    const found = data.find(st => st.REGNO === student.REGNO);
    if (!found) {
      missing_electives.push(student)
    }
  }

  const format_data = missing_electives.map(student => ({
    REGNO: student.REGNO,
    NAME: student.NAME,
    CGPA: student.CGPA || "Missing",
    BRANCH: student.BRANCH,
    OPTION_1: (student.ELECTIVE_SELECTIONS && student.ELECTIVE_SELECTIONS.OPEN_ELECTIVE_4 && student.ELECTIVE_SELECTIONS.ELECTIVE_4.OPTION_1.TITLE) || "Form not filled"
  }))

  writeFileSync(
    `_7thElectiveMissing.xlsx`,
    json2xls(format_data),
    "binary",
  );

  await client.close();
};

updateElective();
