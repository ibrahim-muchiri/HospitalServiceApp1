const pug = require('pug');
const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

module.exports = class email {
 constructor(use, url) {
  (this.to = user.email),
   (this.firstName = user.name.split()[0]),
   (this.url = url),
   (this.from = `Ibrahim Muchiri <${process.env.EMAIL_FROM}>`);
 }
 newTransport() {
  if (process.env.NODE_ENV === 'production') {
   //SENDGRID
   return 1;
  }
  return nodemailer.createTransport({
   host: process.env.EMAIL_HOST,
   port: process.env.EMAIL_PORT,
   auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
   },
  });
 }
 //SEND THE ACTUAL EMAIL
 async send(template, subject) {
  //1) Render HTML based in the pug template
  const html = pug.renderFile(`{__dirname}/../views/email/${template}.pug`, {
   firstName: this.name,
   url: this.url,
   subject,
  });
  //2) Define email option
  const mailOptions = {
   from: this.from,
   to: this.email,
   subject,
   html,
   text: htmlToText.fromString(html),
  };
  //3) Create transport and send the email

  await this.newTransport().sendMail(mailOptions);
 }
 async sendWelcome() {
  await this.send('Welcome', 'Welcome to our organization!');
 }
};
