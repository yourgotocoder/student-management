const { MongoClient } =  require("mongodb");
require("dotenv").config();

const updateElectiveOptions = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const cse_data = await collection.find().toArray();
  const _4thSemStudents = cse_data.filter(
    (student) => student.CURRENT_SEM === 4
  );
  for (let student of _4thSemStudents) {
    await collection.updateOne(
      { REGNO: student.REGNO },
      {
        $set: {
          ELECTIVE_1_OPTIONS: [
            {
              CODE: "CS1438/CS1431",
              TITLE: "Microprocessors and Peripheral Devices",
            },
            {
              CODE: "CS1440/CS1425",
              TITLE: "Internet, Technology and Society",
            },
            {
              CODE: "CS1437/CS1422 ",
              TITLE: "Enterprise Resource Planning",
            },
            {
              CODE: "CS1439/CS1407",
              TITLE: "Communication Techniques",
            },
          ],
          ELECTIVE_2_OPTIONS: [
            {
              CODE: "CS1442",
              TITLE: "User Interface/User Experience (UI/UX) Design",
            },
            {
              CODE: "CS1434",
              TITLE: "Java Programming",
            },
            {
              CODE: "CS1435",
              TITLE: "Python Programming",
            },
            {
              CODE: "CS1435",
              TITLE: "Fundamentals of Web Technology",
            },
          ],
        },
      }
    );
  }
  console.log("Options updated!!");
};

updateElectiveOptions();
