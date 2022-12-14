const parser = require("simple-excel-to-json");
const doc = parser.parseXls2Json(
  __dirname + "/resources/CGPA_List_2022_December.xls"
);
const { MongoClient } = require("mongodb");
require("dotenv").config();

const _4thSemData = [...doc][0];
const _6thSemData = [...doc][1];

const cleanData = (data, sem) => {
  const filteredData = data.filter(
    (student) => typeof student.CGPA === "number" || !student.REGNO
  );
  const transformedData = filteredData.map((student) => ({
    REGNO: student.REGNO,
    NAME: student.NAME,
    CGPA: student.CGPA,
    CURRENT_SEM: sem,
  }));
  return transformedData;
};

const uploadToDb = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const _4thSemDataToBeUploaded = cleanData(_4thSemData, 4);
  const _6thSemDataToBeUploaded = cleanData(_6thSemData, 6);
  for (let student of _4thSemDataToBeUploaded) {
    const studentExists = await collection.findOne({REGNO: student.REGNO});
    if (!studentExists) {
        const savedStudent = await collection.insertOne(student);
    }
  }
  for (let student of _6thSemDataToBeUploaded) {
    const studentExists = await collection.findOne({REGNO: student.REGNO});
    if (!studentExists) {
        const savedStudent = await collection.insertOne(student);
    }
  }
};

uploadToDb();
