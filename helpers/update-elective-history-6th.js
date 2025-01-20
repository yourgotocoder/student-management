const parser = require("simple-excel-to-json");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const _4thdata = parser.parseXls2Json("./resources/4thHistory.xlsx")[0];
const _5thdata = parser.parseXls2Json("./resources/5thHistory.xlsx")[0];
const _6thdata = parser.parseXls2Json("./resources/6thHistory.xlsx")[0];

const data = [..._4thdata].map((student) => ({
  REGNO: student.REGNO,
  NAME: student.NAME,
  ELECTIVE_1: {
    TITLE: student.ELECTIVE_1_TITLE,
    CODE: student.ELECTIVE_1_CODE,
  },
  OPEN_ELECTIVE_1: {
    TITLE: student.OPEN_ELECTIVE_1_TITLE,
    CODE: student.OPEN_ELECTIVE_1_CODE,
  },
  ...(student.MINOR_SPECIALIZATION_1_TITLE && {
    MINOR_SPECIALIZATION_1: {
      TITLE: student.MINOR_SPECIALIZATION_1_TITLE,
      CODE: student.MINOR_SPECIALIZATION_1_CODE,
    },
  }),
}));

for (let student of _5thdata) {
  const foundIndex = data.findIndex((s) => s.REGNO === student.REGNO);

  if (foundIndex !== -1) {
    data[foundIndex]["ELECTIVE_2"] = {
      CODE: student["ELECTIVE_2_CODE"],
      TITLE: student["ELECTIVE_2_TITLE"],
    };
    data[foundIndex]["OPEN_ELECTIVE_2"] = {
      CODE: student["OPEN_ELECTIVE_2_CODE"],
      TITLE: student["OPEN_ELECTIVE_2_TITLE"],
    };

    if (student.MINOR_SPECIALIZATION_2_TITLE) {
      data[foundIndex]["MINOR_SPECIALIZATION_2"] = {
        CODE: student["MINOR_SPECIALIZATION_2_CODE"],
        TITLE: student["MINOR_SPECIALIZATION_2_TITLE"],
      };
      data[foundIndex]["MINOR_SPECIALIZATION_3"] = {
        CODE: student["MINOR_SPECIALIZATION_3_CODE"],
        TITLE: student["MINOR_SPECIALIZATION_3_TITLE"],
      };
    }
  }
}

for (let student of _6thdata) {
  const foundIndex = data.findIndex((s) => s.REGNO === student.REGNO);

  if (foundIndex !== -1) {
    data[foundIndex]["ELECTIVE_3"] = {
      CODE: student["ELECTIVE_3_CODE"],
      TITLE: student["ELECTIVE_3_TITLE"],
    };
    data[foundIndex]["ELECTIVE_4"] = {
      CODE: student["ELECTIVE_4_CODE"],
      TITLE: student["ELECTIVE_4_TITLE"],
    };

    if (student.MINOR_SPECIALIZATION_4_TITLE) {
      data[foundIndex]["MINOR_SPECIALIZATION_4"] = {
        CODE: student["MINOR_SPECIALIZATION_4_CODE"],
        TITLE: student["MINOR_SPECIALIZATION_4_TITLE"],
      };
      data[foundIndex]["MINOR_SPECIALIZATION_5"] = {
        CODE: student["MINOR_SPECIALIZATION_5_CODE"],
        TITLE: student["MINOR_SPECIALIZATION_5_TITLE"],
      };
    }
  }
}
console.log(data);

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");

  for (let [index, student] of data.entries()) {
    const foundStudent = await collection.findOne({ REGNO: student.REGNO });
    if (foundStudent) {
      await collection.updateOne(
        { REGNO: student.REGNO },
        {
          $set: { ...student },
        },
      );
    }
    console.log(`${index + 1} of ${data.length} done`);
  }
  await client.close();
};

updateElective();
