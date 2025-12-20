const mailer = require("./autoMailSender.cjs");

const cron = require("node-cron");

require("dotenv").config();

const allowedDates = ["2025-12-22", "2025-12-26", "2025-12-30"];

cron.schedule("30 4 * * *", async () => {
  const today = new Date().toISOString().split("T")[0];
  if (allowedDates.includes(today)) {
    await mailer();
  }
});
