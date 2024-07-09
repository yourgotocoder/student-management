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
      { CODE: "CS1734", TITLE: "Distributed Database System" },
      { CODE: "CS1748 ", TITLE: "Advanced Operating Systems" },
      { CODE: "CS1744 ", TITLE: "Mobile Computing" },
      { CODE: "CS1759/CS1644", TITLE: "Artificial Intelligence" },
      { CODE: "CS1757", TITLE: "Internet of Things" },
    ];

    let ELECTIVE_9_OPTIONS = [
      { CODE: "CS1732", TITLE: "Cloud Computing" },
      { CODE: "CS1746", TITLE: "Human Computer Interaction" },
      { CODE: "CS1733", TITLE: "Cryptography & Network Security" },
      { CODE: "CS1640/CS1758", TITLE: "Computer Vision" },
      { CODE: "CS1659", TITLE: "Ethical Hacking" },
      { CODE: "CS1743", TITLE: "Cyber Security" },
    ];

    let OPEN_ELECTIVE_2_OPTIONS = [
      { CODE: "CS1728/CS1710", TITLE: "Distributed Systems" },
      { CODE: "AD1722", TITLE: "AI in Healthcare" },
      { CODE: "CE1721", TITLE: "Fundamentals of RS and GIS" },
      { CODE: "CE1722", TITLE: "Optimization Technique" },
      { CODE: "EC1724", TITLE: "Nano Electronics " },
      { CODE: "IT1724", TITLE: "Geographical Information Systems" },
      { CODE: "ME1726", TITLE: "Financial Planning and Analysis" },
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
    ELECTIVE_8_OPTIONS = ELECTIVE_8_OPTIONS.filter((sub) => {
      const bool =
        elective_history.findIndex((el) => el.CODE === sub.CODE) === -1;
      console.log(bool);
      return bool;
    });
    ELECTIVE_9_OPTIONS = ELECTIVE_9_OPTIONS.filter((sub) => {
      const bool =
        elective_history.findIndex((el) => el.CODE === sub.CODE) === -1;
      console.log(bool);
      return bool;
    });
    if (elective_history.findIndex((sub) => sub.CODE === "CS1741") === -1) {
      OPEN_ELECTIVE_2_OPTIONS.push({
        CODE: "EE1724",
        TITLE: "Machine Learning",
      });
    }
    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_8_OPTIONS,
          ELECTIVE_9_OPTIONS,
          OPEN_ELECTIVE_2_OPTIONS,
        },
      },
    );
    console.log(`Updated ${index + 1} of ${_7thSemData.length}`);
  }
  await client.close();
};

updateElective();
