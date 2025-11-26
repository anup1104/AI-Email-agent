const nodemailer = require("nodemailer");

exports.sendEmail = async (to, subject, message, req, res) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_PASS,
		},
	});
	const mailDetails = {
		from: process.env.GMAIL_USER,
		to: to,
		subject: subject,
		text: message,
	};
	await transporter.sendMail(mailDetails);
	// console.log("Email sent");
};
