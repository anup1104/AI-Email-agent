// Nodemailer.js
const nodemailer = require("nodemailer");

exports.sendEmail = async (to, subject, message) => {
  try {
    console.log("Inside sendEmail, preparing transporter");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    console.log("Transporter created, sending email...");

    const result = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      text: message,
    });

    console.log("Email sent successfully:", result.messageId);

    return result;
  } catch (err) {
    console.error("Nodemailer ERROR:", err);
    throw err; // <-- send error back to route
  }
};
