import { createTransport, Transporter } from "nodemailer";
require("dotenv").config();

export interface MailInterface {
  from: string;
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  text?: string;
  html: string;
}

export default class MailService {
  private static instance: MailService;
  private transporter: Transporter;
  private constructor() {
    this.transporter = createTransport({
      host: process.env.SMTP_HOST as string,
      port: +process.env.SMTP_PORT! as number,
      secure: process.env.SMTP_TLS === "yes" ? true : false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  static getInstance() {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }
    return MailService.instance;
  }
  async sendMail(requestType: string, options: MailInterface) {
    return await this.transporter
      .sendMail({
        from: options.from,
        to: options.to,
        cc: options.cc,
        bcc: options.bcc,
        subject: options.subject,
        text: options.text,
        html: options.html,
      })
      .then();
  }

  async verifyConnection() {
    return this.transporter.verify();
  }

  getTransporter() {
    return this.transporter;
  }
}
