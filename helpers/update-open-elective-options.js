const { MongoClient } = require("mongodb");
require("dotenv").config();

const doThings = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  if (client) {
    const db = client.db("cse");
    const collection = db.collection("student-data");
    const studentData = await collection.find().toArray();
    const _4thSemStudents = studentData.filter(
      (student) => student.CURRENT_SEM === 4
    );

    for (let [index, student] of _4thSemStudents.entries()) {
      let open_electives_options = [
        { CODE: "AD201A2", TITLE: "Introduction to Python Programming" },
        { CODE: "EC10201", TITLE: "Introduction to Internet of Things" },
        { CODE: "EE201A2", TITLE: "Analog System Design" },
        { CODE: "ME201A2", TITLE: "Renewable Energy" },
        { CODE: "IT211A2", TITLE: "Management Information Systems" },
      ];
      if (student.BRANCH === "CSE(AI&ML)") {
        open_electives_options = open_electives_options.filter(
          (subject) => subject.TITLE !== "Introduction to Python Programming"
        );
      }
      await collection.updateOne(
        { REGNO: student.REGNO },
        {
          $set: {
            OPEN_ELECTIVE_OPTIONS: open_electives_options,
          },
        }
      );
      console.log(`Update ${index + 1} of ${_4thSemStudents.length}`);
    }
  }
  await client.close();
};
doThings();
