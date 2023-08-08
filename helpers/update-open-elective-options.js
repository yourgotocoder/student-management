const { MongoClient } = require("mongodb");
require("dotenv").config();

const doThings = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  if (client) {
    const db = client.db("cse");
    const collection = db.collection("student-data");
    const studentData = await collection.find().toArray();
    const _7thSemStudents = studentData.filter(
      (student) => student.CURRENT_SEM === 7
    );
    const open_electives_options = [
      { CODE: "CE1721", TITLE: "Fundamental of Remote Sensing and GIS" },
      { CODE: "CE1741", TITLE: "Optimization Techniques" },
      { CODE: "CS1728/CS1701", TITLE: "Distributed System" },
      { CODE: "EC1724", TITLE: "Nano Electronics" },
      { CODE: "EE1724", TITLE: "Machine Learning" },
      { CODE: "IT1724", TITLE: "Geographical Information Systems" },
      { CODE: "BA1721", TITLE: "Enterpreneurship for Engineers" },
      { CODE: "ME1726", TITLE: "Financial Planning and Analysis" },
      { CODE: "AD1722", TITLE: "AI in Healthcare" },
    ];
    for (let [index, student] of _7thSemStudents.entries()) {
      const previous_subjects = [];
      student.ELECTIVE_1 && previous_subjects.push(student.ELECTIVE_1.TITLE);
      student.ELECTIVE_2 && previous_subjects.push(student.ELECTIVE_2.TITLE);
      student.ELECTIVE_4 && previous_subjects.push(student.ELECTIVE_4.TITLE);
      student.ELECTIVE_5 && previous_subjects.push(student.ELECTIVE_5.TITLE);
      student.ELECTIVE_7 && previous_subjects.push(student.ELECTIVE_7.TITLE);
      student.ELECTIVE_8 && previous_subjects.push(student.ELECTIVE_8.TITLE);
      let open_options = [...open_electives_options];
      if (previous_subjects.includes("ARTIFICIAL INTELLIGENCE")) {
        open_options = open_options.filter(
          (subject) => subject.TITLE !== "AI in Healthcare"
        );
      }
      if (previous_subjects.includes("MACHINE LEARNING")) {
        open_options = open_options.filter(
          (subject) => subject.TITLE !== "Machine Learning"
        );
      }
      await collection.updateOne(
        { REGNO: student.REGNO },
        {
          $set: {
            OPEN_ELECTIVE_OPTIONS: open_options,
          },
        }
      );
      console.log(`Update ${index + 1} of ${_7thSemStudents.length}`);
    }
  }
};
doThings();
