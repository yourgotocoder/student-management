const { MongoClient } = require("mongodb");
require("dotenv").config();

const doThings = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  if (client) {
    const db = client.db("cse");
    const collection = db.collection("student-data");
    const studentData = await collection.find().toArray();
    const _6thSemStudents = studentData.filter(
      (student) => student.CURRENT_SEM === 6,
    );

    for (let [index, student] of _6thSemStudents.entries()) {
      let open_electives_options = [
        { CODE: "AD302A2", TITLE: "Introduction to Machine Learning" },
        { CODE: "CE308A2", TITLE: "Hazardous Waste Management" },
        { CODE: "CS304A2", TITLE: "Programming with Python" },
        { CODE: "EC302A2", TITLE: "Introduction to Nanoelectronics" },
        { CODE: "EE304A2", TITLE: "Renewable Energy System" },
        { CODE: "IT333A2", TITLE: "e-Commerce" },
        { CODE: "ME304A2", TITLE: "Financial Planning and Analysis" },
      ];

      await collection.updateOne(
        { REGNO: student.REGNO },
        {
          $set: {
            OPEN_ELECTIVE_3_OPTIONS: open_electives_options,
          },
        },
      );
      console.log(`Update ${index + 1} of ${_6thSemStudents.length}`);
    }
  }
  await client.close();
};
doThings();
