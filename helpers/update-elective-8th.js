const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const data = await collection.find().toArray();

  const _8thSemData = data.filter(
    (student) => student.CURRENT_SEM && student.CURRENT_SEM == 8,
  );
  console.log(_8thSemData.length);
  for (let [index, student] of _8thSemData.entries()) {
    console.log(`Updating for ${student.REGNO}`);
    let ELECTIVE_10_OPTIONS = [
      { CODE: "CS1741", TITLE: "Machine Learning" },
      { CODE: "CS1631", TITLE: "Deep Learning" },
      { CODE: "CS1742", TITLE: "Data Analytics" },
      { CODE: "CS1759", TITLE: "Artificial Intelligence" },
      { CODE: "CS1641", TITLE: "Social Network Analysis" },
    ];

    let ELECTIVE_11_OPTIONS = [
      { CODE: "CS1732", TITLE: "Cloud Computing" },
      { CODE: "CS1733", TITLE: "Cryptography and Network Security" },
      { CODE: "CS1746", TITLE: "Human Computer Interaction" },
      { CODE: "CS1760", TITLE: "Block Chain" },
      { CODE: "CS1743", TITLE: "Cyber Security" },
    ];

    const elective_history = [];

    student.ELECTIVE_1 && elective_history.push(student.ELECTIVE_1);
    student.ELECTIVE_2 && elective_history.push(student.ELECTIVE_2);
    student.ELECTIVE_3 && elective_history.push(student.ELECTIVE_3);
    student.ELECTIVE_4 && elective_history.push(student.ELECTIVE_4);
    student.ELECTIVE_5 && elective_history.push(student.ELECTIVE_5);
    student.ELECTIVE_6 && elective_history.push(student.ELECTIVE_6);
    student.ELECTIVE_7 && elective_history.push(student.ELECTIVE_7);
    console.log(elective_history);
    ELECTIVE_10_OPTIONS = ELECTIVE_10_OPTIONS.filter((sub) => {
      const bool =
        elective_history.findIndex((el) => el.CODE === sub.CODE) === -1;
      console.log(bool);
      return bool;
    });
    ELECTIVE_11_OPTIONS = ELECTIVE_11_OPTIONS.filter((sub) => {
      const bool =
        elective_history.findIndex((el) => el.CODE === sub.CODE) === -1;
      console.log(bool);
      return bool;
    });

    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_10_OPTIONS,
          ELECTIVE_11_OPTIONS,
        },
      },
    );
    console.log(`Updated ${index + 1} of ${_8thSemData.length}`);
  }
  await client.close();
};

updateElective();
