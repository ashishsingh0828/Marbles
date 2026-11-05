/* Local contact-form mail test (Crazy Domains SMTP). */
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const { sendContactNotice } = require("../utils/mail");

const msg = {
  name: "Ashish singh",
  email: "ashishsingh0828@gmail.com",
  phone: "9625181162",
  address: "Faridabad",
  message: "hi hello",
};

(async () => {
  console.log("SMTP_HOST=", process.env.SMTP_HOST);
  console.log("From/User=", process.env.SMTP_USER || process.env.EMAIL_USER);
  console.log("Notify=", process.env.NOTIFICATION_EMAIL);
  try {
    await sendContactNotice("australia", msg);
    console.log("MAIL_SENT_OK");
  } catch (e) {
    console.error("MAIL_FAILED:", e.message);
    process.exit(1);
  }
})();
