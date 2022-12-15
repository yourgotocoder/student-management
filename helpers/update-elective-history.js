const parser = require("simple-excel-to-json");
const doc = parser.parseXls2Json(
  __dirname + "/resources/6thSemElectiveHistory.xls"
);
const { MongoClient } = require("mongodb");
require("dotenv").config();

const elective_history = [...doc][0];

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  for (let student of elective_history) {
    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ...(student.ELECTIVE_1_CODE !== "" && {
            ELECTIVE_1: {
              TITLE: student.ELECTIVE_1_TITLE,
              CODE: student.ELECTIVE_1_CODE,
            },
          }),
          ...(student.ELECTIVE_2_CODE !== "" && {
            ELECTIVE_2: {
              TITLE: student.ELECTIVE_2_TITLE,
              CODE: student.ELECTIVE_2_CODE,
            },
          }),
          ...(student.EMAILID !== "" && { EMAIL_ID: student.EMAILID }),
          ...(student.MINOR_SPECIALIZATION !== "" && {
            MINOR_SPECIALIZATION: student.MINOR_SPECIALIZATION,
            MINOR_1: {
              TITLE: student.MINOR_1_TITLE,
              CODE: student.MINOR_1_CODE,
            },
            MINOR_2: {
              TITLE: student.MINOR_2_TITLE,
              CODE: student.MINOR_2_CODE,
            },
          }),
          ...(student.WITHDRAWN !== "" && { WITHDRAWN: true }),
        },
      }
    );
  }
};

updateElective();
