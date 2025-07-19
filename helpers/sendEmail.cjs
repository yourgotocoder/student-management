const nodeoutlook = require("nodejs-nodemailer-outlook");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const sendMail = async () => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const db_data = await collection.find().toArray();
  const filteredData = db_data.filter((stuData) => stuData.CURRENT_SEM == 5 && !stuData.EMAIL_ID);
  for (let [index, student] of filteredData.entries()) {
    console.log(student.REGNO)
    // Delay required to make sure Outlook email rate limit is not exceeded
    setTimeout(
      () => {
        nodeoutlook.sendEmail({
          auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD,
          },
          from: process.env.EMAIL_ID,
          // to: student.EMAIL_ID,
          to: `${student.NAME.split(" ")[0]}_${student.REGNO}@smit.smu.edu.in`,
          subject: "Passcode for elective",
          html: `<p>Passcode for <a href="https://elective.csesmit.in/">Elective</a>.</p>
                  <p><b>${student.DEFAULT_PASSWORD}</b></p>
                  <p>Copy paste the above code to avoid typos!</p>
                  `,
          text: "Email Password",
          onError: (e) => console.log(e),
          onSuccess: (i) =>
            console.log(`${index + 1}/${filteredData.length} done`),
        });
      },
      (index + 1) * 2000,
    );

  }
  await client.close();
};

sendMail().then(() =>
  console.log(`Done sending emails to 7th sem`),
);
