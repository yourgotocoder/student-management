const nodeoutlook = require("nodejs-nodemailer-outlook");
const { MongoClient } = require("mongodb");
const parser = require("simple-excel-to-json");
require("dotenv").config();

const sendMail = async (filePath) => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");

  const data = parser.parseXls2Json(filePath)[0];

  for (let [index, student] of data.entries()) {
    const studentData = await collection.findOne({ REGNO: student.REGNO });
    // Delay required to make sure Outlook email rate limit is not exceeded
    setTimeout(
      () => {
        nodeoutlook.sendEmail({
          auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD,
          },
          from: process.env.EMAIL_ID,
          to: studentData.EMAIL_ID,
          subject: "Passcode for elective",
          html: `<p>Passcode for <a href="https://elective.csesmit.in/">Elective</a>.</p>
                  <p><b>${studentData.DEFAULT_PASSWORD}</b></p>
                  <p>Copy paste the above code to avoid typos!</p>
                  `,
          text: "Email Password",
          onError: (e) => console.log(e),
          onSuccess: (i) => console.log(`${index + 1}/${data.length} done`),
        });
      },
      (index + 1) * 2000,
    );
  }
  await client.close();
};

sendMail("./resources/8thSem.xlsx").then(() =>
  console.log(`Done sending emails to 7th sem`),
);
