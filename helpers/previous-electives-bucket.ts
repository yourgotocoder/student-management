import { MongoClient } from "mongodb";
require("dotenv").config();

const getElectives = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION as string);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const cse_data = await collection.find().toArray();
  const _6thSemStudents = cse_data.filter(
    (student) => student.CURRENT_SEM === 6
  );
  const electives = _6thSemStudents.reduce((prevValue: any, currentValue) => {
    if (!prevValue.includes(`${currentValue.ELECTIVE_1.CODE} ${currentValue.ELECTIVE_1.TITLE}`)) {
        prevValue.push(`${currentValue.ELECTIVE_1.CODE} ${currentValue.ELECTIVE_1.TITLE}`)
    }
    if (!prevValue.includes(`${currentValue.ELECTIVE_2.CODE} ${currentValue.ELECTIVE_2.TITLE}`)) {
        prevValue.push(`${currentValue.ELECTIVE_2.CODE} ${currentValue.ELECTIVE_2.TITLE}`)
    }
    if (currentValue.MINOR_SPECIALIZATION && !prevValue.includes(`${currentValue.MINOR_SPECIALIZATION}`)) {
        prevValue.push(`${currentValue.MINOR_SPECIALIZATION}`)
    }
    return prevValue;
  }, []);
  console.log(electives)
};

getElectives();

export default getElectives