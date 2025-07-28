const { MongoClient } = require("mongodb");
require("dotenv").config();

const updateElective = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const std_data = await collection.find().toArray();
  const filtered_data = std_data.filter((stu) => stu.CURRENT_SEM === 3);
  const main_bucket = [
    { CODE: "01", TITLE: "Industry 5.0 (CSE)" },
    { CODE: "02", TITLE: "Computational Social Science (CSE)" },
    { CODE: "03", TITLE: "Artificial Intelligence Systems (CSE)" },
    { CODE: "04", TITLE: "Computer Graphics & Visualization (CSE)" },
    { CODE: "05", TITLE: "Computational Mathematics (CSE)" },
    { CODE: "06", TITLE: "Data Science (AI&DS)" },
    { CODE: "07", TITLE: "Computer Vision and Speech Technology (AI&DS)" },
    { CODE: "08", TITLE: "Biomedical Technology (AI&DS)" },
    { CODE: "09", TITLE: "Semiconductor and Nanotechnology (ECE)" },
    { CODE: "10", TITLE: "Internet of Things (ECE)" },
    { CODE: "11", TITLE: "Advanced Specialization on Electric Vehicles (EEE)" },
    { CODE: "12", TITLE: "Artificial Intelligence and Machine Learning (IT)" },
    { CODE: "13", TITLE: "Cyber Security (IT)" },
    { CODE: "14", TITLE: "Advanced Specialization on Electric Vehicles (ME)" },
    { CODE: "15", TITLE: "Entrepreneurship (Management)" },
    { CODE: "16", TITLE: "Business Analytics and Fintech (Management)" },
    { CODE: "17", TITLE: "Digital Marketing (Management)" },
    { CODE: "18", TITLE: "Banking & Insurance" },
    { CODE: "19", TITLE: "Operations & Supply Chain Management" },
    { CODE: "20", TITLE: "Event Management & PR" },
    { CODE: "21", TITLE: "Social Psychology (Psychology)" },
    { CODE: "22", TITLE: "Multimodal Transportation using AIML (CE)" },
    { CODE: "23", TITLE: "Digital Transformation in Construction (CE)" },
  ];
  for (let [index, student] of filtered_data.entries()) {
    const foundStudent = await collection.findOne({ REGNO: student.REGNO });

    let SPECIALIZATION_OPTIONS;
    if (foundStudent.BRANCH === "CSE") {
      SPECIALIZATION_OPTIONS = main_bucket.filter(
        (sub) => sub.TITLE !== "Industry 5.0 (CSE)" && sub.TITLE !== "Artificial Intelligence Systems (CSE)"
      )
    }
    else if (foundStudent.BRANCH === "CSE(AI&ML)") {
      SPECIALIZATION_OPTIONS = main_bucket.filter(
        (sub) =>
          sub.TITLE !== "Computational Social Science (CSE)" &&
          sub.TITLE !== "Computational Mathematics (CSE)" &&
          sub.TITLE !== "Computer Graphics & Visualization (CSE)" &&
          sub.TITLE !== "Data Science (AI&DS)" &&
          sub.TITLE !== "Internet of Things (ECE)",
      );
    } else if (foundStudent.BRANCH === "CSE(IoT)") {
      SPECIALIZATION_OPTIONS = main_bucket.filter(
        (sub) =>
          sub.TITLE !== "Cyber Security (IT)" && sub.TITLE !== "Internet of Things (ECE)",
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
