const parser = require("simple-excel-to-json");
const fs = require("fs");
const { MongoClient } = require("mongodb");
const json2xls = require("json2xls");
require("dotenv").config();

const updateElective = async (data) => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const result = [];
  for (let [index, student] of data.entries()) {
    console.log(`Updating for ${student.REGNO}`);
    const found = await collection.findOne({ REGNO: student.REGNO });
    if (found) {
      result.push({ ...student, NAME: found.NAME, BRANCH: found.BRANCH });
    }
    console.log(`Updated ${index + 1} of ${data.length}`);
  }
  const xlsData = json2xls(result);
  fs.writeFileSync("_5thAIMLDataWithName.xlsx", xlsData, "binary");
};

const studentsData = parser.parseXls2Json("./resources/_5thAIMLData.xlsx")[0];

updateElective(studentsData);
