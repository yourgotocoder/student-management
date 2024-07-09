const parser = require("simple-excel-to-json");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const elective_data = parser.parseXls2Json("./resources/_6thData.xlsx")[0];

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();

  const ELECTIVE_5_OPTIONS = [
    { CODE: "CS1659", TITLE: "Ethical Hacking" },
    { CODE: "CS1646", TITLE: "Speech and Natural Language Processing" },
    { CODE: "CS1756", TITLE: "R Programming" },
    { CODE: "CS1742", TITLE: "Data Analytics" },
  ];

  const ELECTIVE_6_OPTIONS = [
    { CODE: "CS1741", TITLE: "Machine Learning" },
    { CODE: "CS1631", TITLE: "Deep Learning" },
    { CODE: "CS1648", TITLE: "Signal and Networks" },
    { CODE: "CS1732", TITLE: "Cloud Computing" },
    { CODE: "CS1757", TITLE: "Internet of Things" },
  ];

  const ELECTIVE_7_OPTIONS = [
    { CODE: "CS1650", TITLE: "Agile Methodology" },
    { CODE: "CS1723", TITLE: "Big Data" },
    { CODE: "CS1760", TITLE: "Block Chain Coding" },
    { CODE: "CS1641", TITLE: "Social Network Analysis" },
  ];
  for (let [index, student] of elective_data.entries()) {
    const elective_5_title = student.ELECTIVE_5;
    const elective_6_title = student.ELECTIVE_6;
    const elective_7_title = student.ELECTIVE_7;
    const ELECTIVE_5 = ELECTIVE_5_OPTIONS.find(
      (elective) => elective.TITLE === elective_5_title,
    );
    const ELECTIVE_6 = ELECTIVE_6_OPTIONS.find(
      (elective) => elective.TITLE === elective_6_title,
    );
    const ELECTIVE_7 = ELECTIVE_7_OPTIONS.find(
      (elective) => elective.TITLE === elective_7_title,
    );
    const foundStudent = await collection.findOne({ REGNO: student.REGNO });
    if (foundStudent) {
      await collection.updateOne(
        { REGNO: student.REGNO },
        {
          $set: {
            ELECTIVE_5,
            ELECTIVE_6,
            ELECTIVE_7,
          },
        },
      );
    }
    console.log(`Updating ${index + 1} out of ${elective_data.length}`);
  }
  await client.close();
};

updateElective();
