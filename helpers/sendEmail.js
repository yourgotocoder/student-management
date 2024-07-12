const nodeoutlook = require("nodejs-nodemailer-outlook");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const sendMail = async (sem) => {
  const client = await MongoClient.connect(process.env.DB_CONNECTION);
  const db = client.db("cse");
  const collection = db.collection("student-data");
  const db_data = await collection.find().toArray();

  const filtered_data = db_data.filter(
    (student) => student.CURRENT_SEM === sem,
  );

  for (let [index, student] of filtered_data.entries()) {
    if (student.EMAIL_ID) {
      // Delay required to make sure Outlook email rate limit is not exceeded
      setTimeout(
        () => {
          nodeoutlook.sendEmail({
            auth: {
              user: process.env.EMAIL_ID,
              pass: process.env.EMAIL_PASSWORD,
            },
            from: process.env.EMAIL_ID,
            to: student.EMAIL_ID,
            subject: "Passcode for elective",
            html: `<p>Passcode for <a href="https://elective.dalabsmit.in/">Elective</a>.</p>
                  <p><b>${student.DEFAULT_PASSWORD}</b></p>
                  <p>Copy paste the above code to avoid typos!</p>
                  `,
            text: "Email Password",
            onError: (e) => console.log(e),
            onSuccess: (i) =>
              console.log(`${index + 1}/${filtered_data.length} done`),
          });
        },
        (index + 1) * 2000,
      );
    } else {
      console.log(`${student.REGNO} email does not exist`);
    }
  }
  await client.close();
};

sendMail(7).then(() => console.log(`Done sending emails to 7th sem`));
