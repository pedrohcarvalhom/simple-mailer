import nodemailer from 'nodemailer'

export default class BaseEmail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      }
    })
  };

  sendMail(mailOptions, callback) {
    return this.transporter.sendMail(mailOptions, callback)
  }
}