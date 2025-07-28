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
    { CODE: "09", TITLE: "Cyber Security (IT)" },
    { CODE: "10", TITLE: "Multimedia Computing & Communications (IT)" },
    { CODE: "11", TITLE: "Advanced Specialization on Electric Vehicles (EEE)" },
    { CODE: "12", TITLE: "Electrice Drive Vehicle Engineering (EEE)" },
    { CODE: "13", TITLE: "Power and Energy Systems (EEE)" },
    { CODE: "14", TITLE: "Signal Processing (ECE)" },
    { CODE: "15", TITLE: "Semiconductor and Nanotechnology (ECE)" },
    { CODE: "16", TITLE: "SG Communication (ECE)" },
    { CODE: "17", TITLE: "Internet of Things (ECE)" },
    { CODE: "18", TITLE: "Automative Engineering (ME)" },
    { CODE: "19", TITLE: "Machine Design (ME)" },
    { CODE: "20", TITLE: "Robotics and Automation (ME)" },
    { CODE: "21", TITLE: "Advanced Specialization on Electric Vehicles (ME)" },
    { CODE: "22", TITLE: "Natural Hazards and Disaster Management (CE)" },
    { CODE: "23", TITLE: "Earhquake Engineering (CE)" },
    { CODE: "24", TITLE: "Geoinformatics (CE)" },
    { CODE: "25", TITLE: "Environmental Engineering (CE)" },
    { CODE: "26", TITLE: "Entrepreneurship (Management)" },
    { CODE: "27", TITLE: "Business Analytics and Fintech (Management)" },
    { CODE: "28", TITLE: "Digital Marketing (Management)" },
    { CODE: "29", TITLE: "Organizational Psychology (Psychology)" },
    { CODE: "30", TITLE: "Social Psychology (Psychology)" }
  ];
  for (let [index, student] of filtered_data.entries()) {
    const foundStudent = await collection.findOne({ REGNO: student.REGNO });

    let SPECIALIZATION_OPTIONS;
    if (foundStudent.BRANCH === "CSE") {
      SPECIALIZATION_OPTIONS = main_bucket
    }
    else if (foundStudent.BRANCH === "CSE(AI&ML)") {
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
