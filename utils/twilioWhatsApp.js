const twilio = require("twilio");

const ACCOUNT_SID = process.env.ACOOUNT || `AC2c8c3f7b3b0d1ffd0acc0446b237ccd2`;
const AUTH_TOKEN = process.env.TOKEN || `87b049b3a0d44835402b4ca053ea692d`;
const PHONE_NUMBER_WHATSAPP = `whatsapp:+14155238886`;

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendWhatsApp = async (body, from, to) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+5491131545981",
      //`whatsapp:+5491131332857`
    });
    console.log(message);
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = sendWhatsApp;
