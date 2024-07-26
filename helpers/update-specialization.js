const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const std_data = await collection.find().toArray();
  const filtered_data = std_data.filter((stu) => stu.CURRENT_SEM === 3);
  const main_bucket = [
    { CODE: "01", TITLE: "Industry 5.0" },
    { CODE: "02", TITLE: "Computational Social Science" },
    { CODE: "03", TITLE: "Artificial Intelligence Systems" },
    { CODE: "04", TITLE: "Computer Graphics & Visualization" },
    { CODE: "05", TITLE: "Computational Mathematics" },
    { CODE: "06", TITLE: "Data Science" },
    { CODE: "07", TITLE: "Computer Vision and Speech Technology" },
    { CODE: "08", TITLE: "Biomedical Technology" },
    { CODE: "09", TITLE: "Cyber Security" },
    { CODE: "10", TITLE: "Multimedia Computing & Communications" },
    { CODE: "11", TITLE: "Advanced Specialization on Electric Vehicles" },
    { CODE: "12", TITLE: "Electrice Drive Vehicle Engineering" },
    { CODE: "13", TITLE: "Power and Energy Systems" },
    { CODE: "14", TITLE: "Signal Processing" },
    { CODE: "15", TITLE: "Semiconductor and Nanotechnology" },
    { CODE: "16", TITLE: "SG Communication" },
    { CODE: "17", TITLE: "Internet of Things" },
    { CODE: "18", TITLE: "Automative Engineering" },
    { CODE: "19", TITLE: "Machine Design" },
    { CODE: "20", TITLE: "Robotics and Automation" },
    { CODE: "21", TITLE: "Advanced Specialization on Electric Vehicles" },
    { CODE: "22", TITLE: "Natural Hazards and Disaster Management" },
    { CODE: "23", TITLE: "Earhquake Engineering" },
    { CODE: "24", TITLE: "Geoinformatics" },
    { CODE: "25", TITLE: "Environmental Engineering" },
  ];
  for (let [index, student] of filtered_data.entries()) {
    const foundStudent = await collection.findOne({ REGNO: student.REGNO });
    let SPECIALIZATION_OPTIONS;
    if (foundStudent.BRANCH === "CSE") {
      SPECIALIZATION_OPTIONS = main_bucket.filter(
        (sub) =>
          sub.TITLE !== "Industry 5.0" &&
          sub.TITLE !== "Artificial Intelligence Systems",
      );
    } else if (foundStudent.BRANCH === "CSE(AI&ML)") {
      SPECIALIZATION_OPTIONS = main_bucket.filter(
        (sub) =>
          sub.TITLE !== "Computational Social Science" &&
          sub.TITLE !== "Computational Mathematics" &&
          sub.TITLE !== "Computer Graphics & Visualization" &&
          sub.TITLE !== "Data Science" &&
          sub.TITLE !== "Internet of Things",
      );
    } else if (foundStudent.BRANCH === "CSE(IoT)") {
      SPECIALIZATION_OPTIONS = main_bucket.filter(
        (sub) =>
          sub.TITLE !== "Cyber Security" && sub.TITLE !== "Internet of Things",
      );
    }
    if (foundStudent) {
      await collection.updateOne(
        { REGNO: student.REGNO },
        {
          $set: {
            SPECIALIZATION_OPTIONS,
          },
          $unset: {
            SPECIALIZATION: 0,
          },
        },
      );
    }
    console.log(`Updating ${index + 1} out of ${filtered_data.length}`);
  }
  await client.close();
};

updateElective();
