const parser = require("simple-excel-to-json");
const fs = require("fs");
const { MongoClient } = require("mongodb");
const json2xls = require("json2xls");
require("dotenv").config();

const getNoCGPA = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const student_data = await collection.find().toArray();

  const no_cgpa = student_data
    .filter((std) => !std.CGPA && std.CURRENT_SEM < 9)
    .map((std) => ({ REGNO: std.REGNO }));

  console.log(no_cgpa);
  await client.close();
};

getNoCGPA();
