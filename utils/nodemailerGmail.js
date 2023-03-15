const { createTransport } = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS_EMAIL_API;

const trasport = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});

const sendEmail = async (mailOptions) => {
  try {
    const result = trasport.sendMail(mailOptions);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
module.exports = sendEmail;
