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
      const elective_history = [];

      if (
        student.ELECTIVE_1 &&
        !elective_history.includes(student.ELECTIVE_1.TITLE)
      ) {
        elective_history.push(student.ELECTIVE_1.TITLE);
      }
      if (
        student.ELECTIVE_2 &&
        !elective_history.includes(student.ELECTIVE_2.TITLE)
      ) {
        elective_history.push(student.ELECTIVE_2.TITLE);
      }
      if (
        student.ELECTIVE_3 &&
        !elective_history.includes(student.ELECTIVE_3.TITLE)
      ) {
        elective_history.push(student.ELECTIVE_3.TITLE);
      }
      if (
        student.ELECTIVE_4 &&
        !elective_history.includes(student.ELECTIVE_4.TITLE)
      ) {
        elective_history.push(student.ELECTIVE_4.TITLE);
      }

      if (
        student.MINOR_SPECIALIZATION_1 &&
        !elective_history.includes(student.MINOR_SPECIALIZATION_1.TITLE)
      ) {
        elective_history.push(student.MINOR_SPECIALIZATION_1.TITLE);
      }
      if (
        student.MINOR_SPECIALIZATION_2 &&
        !elective_history.includes(student.MINOR_SPECIALIZATION_2.TITLE)
      ) {
        elective_history.push(student.MINOR_SPECIALIZATION_2.TITLE);
      }
      if (
        student.MINOR_SPECIALIZATION_3 &&
        !elective_history.includes(student.MINOR_SPECIALIZATION_3.TITLE)
      ) {
        elective_history.push(student.MINOR_SPECIALIZATION_3.TITLE);
      }
      if (
        student.MINOR_SPECIALIZATION_4 &&
        !elective_history.includes(student.MINOR_SPECIALIZATION_4.TITLE)
      ) {
        elective_history.push(student.MINOR_SPECIALIZATION_4.TITLE);
      }

      if (
        student.OPEN_ELECTIVE_1 &&
        !elective_history.includes(student.OPEN_ELECTIVE_1.TITLE)
      ) {
        elective_history.push(student.OPEN_ELECTIVE_1.TITLE);
      }
      if (
        student.OPEN_ELECTIVE_2 &&
        !elective_history.includes(student.OPEN_ELECTIVE_2.TITLE)
      ) {
        elective_history.push(student.OPEN_ELECTIVE_2.TITLE);
      }

      let open_electives_options = [
        { CODE: "AD302A2", TITLE: "Introduction to Machine Learning" },
        { CODE: "CE308A2", TITLE: "Hazardous Waste Management" },
        { CODE: "CS304A2", TITLE: "Programming with Python" },
        { CODE: "EC302A2", TITLE: "Introduction to Nanoelectronics" },
        { CODE: "EE304A2", TITLE: "Renewable Energy System" },
        { CODE: "IT333A2", TITLE: "e-Commerce" },
        { CODE: "ME304A2", TITLE: "Financial Planning and Analysis" },
      ];

      if (student.BRANCH === "CSE(AI&ML)") {
        open_electives_options = open_electives_options.filter(
          (sub) => sub.TITLE !== "Introduction to Machine Learning",
        );
        open_electives_options = open_electives_options.filter(
          (sub) => sub.TITLE !== "Programming with Python",
        );
      }

      if (elective_history.includes("Machine Learning")) {
        open_electives_options = open_electives_options.filter(
          (sub) => sub.TITLE !== "Introduction to Machine Learning",
        );
      }

      if (elective_history.includes("INTRODUCTION TO MACHINE LEARNING")) {
        open_electives_options = open_electives_options.filter(
          (sub) => sub.TITLE !== "Introduction to Machine Learning",
        );
      }

      if (elective_history.includes("Introduction to Python ")) {
        open_electives_options = open_electives_options.filter(
          (sub) => sub.TITLE !== "Programming with Python",
        );
      }

      if (elective_history.includes("Data Analytics using Python")) {
        open_electives_options = open_electives_options.filter(
          (sub) => sub.TITLE !== "Programming with Python",
        );
      }

      if (
        elective_history.includes(
          "Seminar / Project work using Python Or R Programming",
        )
      ) {
        open_electives_options = open_electives_options.filter(
          (sub) => sub.TITLE !== "Programming with Python",
        );
      }
      if (elective_history.includes("Renewable Energy")) {
        open_electives_options = open_electives_options.filter(
          (sub) => sub.TITLE !== "Renewable Energy System",
        );
      }
      if (elective_history.includes("Renewable Energy ")) {
        open_electives_options = open_electives_options.filter(
          (sub) => sub.TITLE !== "Renewable Energy System",
        );
      }

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
