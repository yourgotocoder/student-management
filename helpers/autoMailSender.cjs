const nodeoutlook = require("nodejs-nodemailer-outlook");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendMail = async () => {
  console.log("sendMail started");

  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");

  const db_data = await collection.find().toArray();

  const filteredData = db_data.filter(
    (stuData) =>
      (stuData.CURRENT_SEM == 8 &&
        stuData.ELECTIVE_SELECTIONS &&
        !stuData.ELECTIVE_SELECTIONS.ELECTIVE_5) ||
      stuData.CURRENT_SEM == 4 ||
      stuData.CURRENT_SEM == 6,
  );

  console.log(`Total emails to send: ${filteredData.length}`);

  for (let i = 0; i < filteredData.length; i++) {
    const student = filteredData[i];

    console.log(`Sending ${i + 1}/${filteredData.length} → ${student.REGNO}`);

    nodeoutlook.sendEmail({
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
      from: process.env.EMAIL_ID,
      to: student.EMAIL_ID,
      subject: "Passcode for elective",
      html: `
        <p>Passcode for <a href="https://elective.csesmit.in/">Elective</a>.</p>
        <p><b>${student.DEFAULT_PASSWORD}</b></p>
        <p>Copy paste the above code to avoid typos!</p>
      `,
      text: "Email Password",
      onError: (e) => console.error("Email error:", e),
      onSuccess: () => console.log(`✔ Sent ${i + 1}/${filteredData.length}`),
    });

    //⏳ RATE LIMIT: 2 seconds per email
    if (i < filteredData.length - 1) {
      await delay(2000);
    }
  }

  await client.close();
  console.log("sendMail completed");
};

module.exports = sendMail;
