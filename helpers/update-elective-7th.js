const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();

  const _7thSemData = data.filter(
    (student) => student.CURRENT_SEM && student.CURRENT_SEM == 7,
  );
  console.log(_7thSemData.length);
  for (let [index, student] of _7thSemData.entries()) {
    console.log(`Updating for ${student.REGNO}`);
    let ELECTIVE_8_OPTIONS = [
      { CODE: "CS1741", TITLE: "Machine Learning" },
      { CODE: "CS1631", TITLE: "Deep Learning" },
      { CODE: "CS1650", TITLE: "Agile Methodology" },
      { CODE: "CS1742", TITLE: "Data Analytics" },
      { CODE: "CS1759/CS1644", TITLE: "Artificial Intelligence" },
      { CODE: "CS1757", TITLE: "Internet of Things" },
    ];

    let ELECTIVE_9_OPTIONS = [
      { CODE: "CS1732", TITLE: "Cloud Computing" },
      { CODE: "CS1756", TITLE: "R Programming" },
      { CODE: "CS1733", TITLE: "Cryptography & Network Security" },
      { CODE: "CS1640/CS1758", TITLE: "Computer Vision" },
      { CODE: "CS1659", TITLE: "Ethical Hacking" },
      { CODE: "CS1743", TITLE: "Cyber Security" },
    ];

    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_8_OPTIONS,
          ELECTIVE_9_OPTIONS,
        },
      },
    );
    console.log(`Updated ${index + 1} of ${_7thSemData.length}`);
  }
  await client.close();
};

updateElective();
