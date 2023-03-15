const twilio = require("twilio");

const dotenv = require("dotenv");
dotenv.config();

//no toma process.env
const accountSid = process.env.ACOOUNT || "AC2c8c3f7b3b0d1ffd0acc0446b237ccd2";
const authToken = process.env.TOKEN || "87b049b3a0d44835402b4ca053ea692d"; 

const client = twilio(accountSid, authToken);

const sendSMS = async (body, from, to) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: from,
      to: to,
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendSMS;
